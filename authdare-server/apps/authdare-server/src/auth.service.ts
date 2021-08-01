import { DatabaseManager, DATABASE_MANAGER_TOKEN } from './models/database';
import { Inject, UnauthorizedException } from "@nestjs/common";
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { classToPlain } from "class-transformer";
import { Repository } from "typeorm";
import { Login, UserEntity, UserPermission } from "./models";
import { Groups } from "./models/groups";

/**
 * Check the user allready exists in the database or not, throw BadRequestException if exits or continue.
 * @param repo UserRepository
 * @param userInstance User details
 */
export async function checkUserExistThenThrowException(repo: Repository<UserEntity>, userInstance: UserEntity): Promise<void> {
    const TAG = 'checkUserExistThenThrowException';

    const foundUser = await repo.findOne({
        where: [
            { orgname: userInstance.orgname },
            { email: userInstance.email }
        ]
    });

    if (foundUser) {
        if (foundUser.email == userInstance.email) {
            throw new BadRequestException(`There is already an account with the email, ${userInstance.email}`)
        }

        if (foundUser.orgname == userInstance.orgname) {
            throw new BadRequestException(`Organization name is already taken!`)
        }
        Logger.error(`Dublicate user. body: ${userInstance}, database:${foundUser}.`, TAG)
        throw new BadRequestException('Something went wrong please try again later!')
    }
}


@Injectable()
export class AuthService {
    private readonly TAG = AuthService.name
    constructor(
        private readonly jwt: JwtService,
        @Inject(DATABASE_MANAGER_TOKEN) private readonly dbm: DatabaseManager<UserPermission>,
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ) { }


    async join(user: UserEntity) {
        const TAG = this.TAG + '.join';

        const userInstance = await new UserEntity(user)
            .validateAndTransformToClassInstance([Groups.SIGNUP]);

        const userRepository = await this.dbm.getUserRepositoryByOrgname(user.orgname);

        await checkUserExistThenThrowException(userRepository, user);

        try {
            /**
             * Permissions must added by organization admin
             */
            userInstance.permissions = [];
            const createdUser = await userRepository.save(userInstance);
            const plainUser = classToPlain(createdUser);
            return this.signAuthCookie(plainUser);
        } catch (err) {
            Logger.error(err, TAG);
            throw new InternalServerErrorException();
        }
    }


    async login(credentials: Login) {
        const { email, password } = await new Login(credentials).validateAndTransformToClassInstance();

        const foundUser = await this.userRepo.findOne({ where: { email } });
        if (foundUser && foundUser.password) {
            const isPassMatch = compare(password, foundUser.password)
            if (isPassMatch) {
                return this.jwt.sign(classToPlain(foundUser));
            }
        }
        throw new UnauthorizedException(`We could not foundUser) the account with the email addresss, ${email}`)
    }


    /**
     * Add the user to the organization
     * Create user's database resource and sync it.
     * Then return the auth token. 
     * @param user 
     */
    async signup(user: UserEntity) {
        const TAG = this.TAG + '.signup';

        const userInstance = await new UserEntity(user)
            .validateAndTransformToClassInstance([Groups.SIGNUP]);

        await checkUserExistThenThrowException(this.userRepo, user);

        // Initialize client database
        const clientConnection = await this.dbm.orgConnection(userInstance.orgname, true, true);

        const clientUserRepo = clientConnection.getRepository(UserEntity);

        // Create user account in our database
        try {
            // set permissions 
            userInstance.permissions = this.dbm.adminPermissions();

            // Save user in our database
            const createdUser = await this.userRepo.save(userInstance);

            // Save user in client database as well
            const ___createdUserInClient = await clientUserRepo.save(userInstance);
            const token = this.signAuthCookie(createdUser);
            return token;
        } catch (err) {
            Logger.error(err, TAG);
            throw new InternalServerErrorException();
        }

    }


    /**
     * Sign the token including only the fields of the Groups.AUTH_COOKIE in the entity.
     * @param userInstance User details
     * @returns 
     */
    async signAuthCookie(userInstance: UserEntity) {
        userInstance.validateAndTransformToClassInstance([Groups.AUTH_COOKIE]);
        const plainUser = classToPlain(userInstance, { groups: [Groups.AUTH_COOKIE] });
        const TAG = this.TAG + 'signAuthCookie';
        if (plainUser.orgname && plainUser.email && plainUser.permissions && plainUser.permissions) {
            return this.jwt.sign(plainUser);
        }
        Logger.error(`Could not sing the cookie for the payload ${plainUser}`, TAG);
        throw new InternalServerErrorException();
    }

}