import { UnauthorizedException } from "@nestjs/common";
import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { classToPlain } from "class-transformer";
import { Repository } from "typeorm";
import { Login, UserEntity } from "./models";
import { Groups } from "./models/groups";
import { adminPermissions, getOrgRepository, orgConnection } from "./utils";



export async function getUserRepository(orgname: string) {
    return await getOrgRepository<UserEntity>({ orgname, resource: 'users' });
}

export async function checkUserExistThenThrowException(repo: Repository<UserEntity>, userInstance: UserEntity) {
    const TAG = AuthService.name + '.checkUserExistThenThrowException';

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

    return;
}


@Injectable()
export class AuthService {
    private readonly TAG = AuthService.name
    constructor(
        private readonly jwt: JwtService,
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ) { }


    async join(user: UserEntity) {
        const TAG = this.TAG + '.join';

        const userInstance = await new UserEntity(user)
            .validateAndTransformToClassInstance([Groups.SIGNUP]);

        const userRepository = await getUserRepository(user.orgname);

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
        const clientConnection = await orgConnection(userInstance.orgname, true, true);

        const clientUserRepo = clientConnection.getRepository(UserEntity);

        // Create user account in our database
        try {
            // set permissions 
            userInstance.permissions = adminPermissions(userInstance.orgname);

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