import { JwtService } from '@nestjs/jwt';
import { DatabaseManager, Groups, UserEntity, Login } from '@authdare/models';
import { BadRequestException } from "@nestjs/common";
import { Repository } from 'typeorm';

export class AuthCommonService {

    constructor(
        protected readonly dbm: DatabaseManager,
        protected readonly authdareUserRepo: Repository<UserEntity>,
        protected readonly jwt: JwtService
    ) { }

    async prepareUserForSignup(user: UserEntity) {
        const userInstance = await this.validateAndTransformUserDataForSignup(user);
        if (await this.isOrganizaitonExist(userInstance.orgname!)) {
            throw new BadRequestException('Organization already exists!');
        }
        if (await this.isUserExist(userInstance.orgname!, userInstance.email!)) {
            throw new BadRequestException('User already exists!');
        }
        return userInstance;
    }

    /**
     * If User data is valid for Joining the team  then return the user data, BadRequestException otherwise
     * @param user UserEntity object
     * @returns UserEntity instance
     * @throws BadRequestException
     */
    async prepareUserForJoinTeam(orgname: string, credentials: Login) {
        const userInstance = await this.validateAndTransformUserDataForJoin(orgname, credentials);

        if (!(await this.isOrganizaitonExist(userInstance.orgname!))) {
            throw new BadRequestException('Organization does not exist!')
        }

        if (await this.isUserExist(userInstance.orgname!, userInstance.email!)) {
            throw new BadRequestException('User already exists!');
        }
        return userInstance;
    }

    async prepareUserForLogin(user: UserEntity) {

    }

    /**
     * Before creating the user subscription, initialize the client database with orgname.
     * @param orgname 
     */
    async createClientDatabase(orgname: string) {
        await this.dbm.orgConnection(orgname, true, true);
    }


    private async validateAndTransformUserData(user: any, _permissions: any[], groups: Groups[]) {
        const userInstance = new UserEntity(user);
        await userInstance.validateAndTransformToClassInstance(groups);
        userInstance.permissions = _permissions;
        return userInstance;
    }

    /**
     * Validate and transform the data return the instance or object of the data. If data is not valid, thow BadRequestException
     * @param user UserEntity object
     * @returns  UserEntity instance 
     */
    private async validateAndTransformUserDataForSignup(user: UserEntity) {
        return await this.validateAndTransformUserData(user, this.dbm.adminPermissions(), [Groups.SIGNUP])
    }

    /**
     * Validate and transform the data return the instance or object of the data. If data is not valid, thow BadRequestException
     * @param user UserEntity object
     * @returns  UserEntity instance 
     */
    private async validateAndTransformUserDataForJoin(orgname: string, { email, password }: Login) {
        return await this.validateAndTransformUserData({ orgname, email, password }, [], [Groups.JOIN_TEAM]);
    }


    /**
     * Check if the organization exist or not.
     * @param orgname Alrady validated orgname
     * @return Boolean
     */
    async isOrganizaitonExist(orgname: string): Promise<false | UserEntity> | never {
        const foundSubscription = await this.authdareUserRepo.findOne({ where: { orgname: orgname } });
        if (foundSubscription) {
            return foundSubscription;
        }
        return false;
    }

    /**
     * Check the user exists in authdare org and client organization (assuming orgnizaiton alrady exist,  check the existance of organziation first!).
     * If user exists throw BadRequestException.
     * @param orgname already validated orgname
     * @param email already validated email
     * @throw BadRequestException if the user exist in the organizaiton.
     */
    async isUserExist(orgname: string, email: string): Promise<false | UserEntity> | never {
        if (await this.isOrganizaitonExist(orgname)) {
            const clientUserRepo = await this.dbm.getUserRepositoryByOrgname(orgname);
            const foundUser = await clientUserRepo.findOne({ where: { email } });
            if (foundUser) {
                return new UserEntity(foundUser);
            }
        }
        return false;
    }


    /**
     * Run this method after
     * - all validation is done
     * - user does not exist 
     * - organization does not exist 
     * @param user UserEntity instance 
     */
    async finishSubscription(userInstance: UserEntity) {
        await this.authdareUserRepo.save(this.authdareUserRepo.create(userInstance));
        await this.createClientDatabase(userInstance.orgname!);
        return await this.createTeamMember(userInstance);
    }


    /**
     * Run this method after 
     * - all validation is done 
     * - user does not exist in the organization 
     * - organization exists already. 
     * @param orgname 
     * @param userData UserEntity instance 
     */
    async createTeamMember(userInstance: UserEntity) {
        const clientUserRepo = await this.dbm.getUserRepositoryByOrgname(userInstance.orgname!);
        const __createdUser = await clientUserRepo.save(clientUserRepo.create(userInstance));
        return await this.signToken(userInstance);
    }

    async signToken(userInstance: UserEntity) {
        const authTokenPayload = await userInstance.validateAndTransformToClassInstance([Groups.AUTH_COOKIE], true)
        return await this.jwt.sign(authTokenPayload);
    }

}