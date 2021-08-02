import { JwtService } from '@nestjs/jwt';
import { AuthCommonService } from './auth-common';
import { DatabaseManager, DATABASE_MANAGER_TOKEN, Groups, Login, UserEntity } from '@authdare/models';
import { Inject, BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';


@Injectable()
export class AuthService extends AuthCommonService {
  constructor(
    @Inject(DATABASE_MANAGER_TOKEN) protected readonly dbm: DatabaseManager,
    @InjectRepository(UserEntity) protected readonly authdareUserRepo: Repository<UserEntity>,
    protected readonly jwt: JwtService,
  ) {
    super(dbm, authdareUserRepo, jwt);
  }



  async login(credential: Login): Promise<string> | never {
    const { orgname, email, password } = await new Login(credential).validateAndTransformToClassInstance();
    const foundUser = await this.isUserExist(orgname!, email!);
    if (!foundUser) {
      throw new BadRequestException(`There is no account associated with the email ${email}`);
    }
    const isPasswordMatch = await compare(password!, foundUser.password!);
    if (isPasswordMatch) {
      return await this.signToken(foundUser)
    }
    throw new BadRequestException('Password does not match!');
  }



  async join(user: UserEntity): Promise<void> | never {
    await this.createTeamMember(await this.prepareUserForJoinTeam(user) as UserEntity);
  }



  async signup(user: UserEntity) {
    return await this.finishSubscription(await this.prepareUserForSignup(user) as UserEntity);

  }
}
