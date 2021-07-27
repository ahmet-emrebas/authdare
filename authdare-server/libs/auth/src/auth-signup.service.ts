import { AuthUserResourceService, AUTH_USER_RESOURCE_SERVICE_TOKEN, } from './auth-user-resource.service';
import { genToken } from '@authdare/common';
import { SignupService, connectDB, ENTITIES_TOKEN, getSQLiteDBName } from '@authdare/core';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User } from '@authdare/models';
import { pick } from 'lodash';

export const AUTH_SIGNUP_SERVICE_TOKEN = genToken();

/**
 * SQLite Implementation
 */
@Injectable()
export class AuthSignupService implements SignupService<any> {
  constructor(
    @Inject(AUTH_USER_RESOURCE_SERVICE_TOKEN)
    private readonly userService: AuthUserResourceService,
    private jwt: JwtService,
    @Inject(ENTITIES_TOKEN) private readonly entities: any[]
  ) { }

  /**
   * Create a new user and return the token
   * @param createUserDto
   */
  async signup(createUserDto: CreateUserDto): Promise<string> {
    const savedUser = await this.userService.save(createUserDto);
    const token = this.jwt.sign(pick(savedUser, ['email', 'org.name', 'org.database']));

    const con = await connectDB({
      name: savedUser.org.name,
      type: 'sqlite',
      database: getSQLiteDBName(savedUser.org.name),
      entities: this.entities,
      synchronize: true,
      dropSchema: true,
    });

    const userRepo = con.getRepository(User);
    const created = userRepo.create(savedUser);
    await userRepo.save(created);

    return token;
  }



}
