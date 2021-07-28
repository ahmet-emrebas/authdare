import { LoginDTO } from './dto/login.dto';
import { BaseResourceService, getResourceService } from '@authdare/base';
import { CreateUserDTO, UpdateUserDTO, UserEntity } from '@authdare/models';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { omit, toPlainObject } from 'lodash';
import { Repository } from 'typeorm';
import { SignupDTO } from './dto';
import { compare } from 'bcrypt';
import { getDBConnection } from '@authdare/base/get-db-connection';
import { createRoleAndPermissions } from './create-role-permissions';

@Injectable()
export class AuthUserService extends BaseResourceService<
UserEntity,
CreateUserDTO,
UpdateUserDTO
> {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(UserEntity)
    protected readonly orgRepo: Repository<UserEntity>,
    @InjectRepository(UserEntity)
    protected readonly userRepo: Repository<UserEntity>,
  ) {
    super(userRepo, CreateUserDTO, UpdateUserDTO);
  }

  async signup(signupDTO: SignupDTO): Promise<string> | never {
    await this.validate(SignupDTO, signupDTO);
    const asClient = { ...signupDTO };
    const createdClientUSer = await this.create(toPlainObject(asClient));
    const createdAdminUser = await this.initClientDatabase(createdClientUSer);
    const tokenPaylaod = toPlainObject(createdAdminUser);
    return this.jwt.sign(tokenPaylaod);
  }

  /**
   * After the user successfully subscribed, we create their database
   * @param user
   * @returns
   */
  private async initClientDatabase(user: UserEntity): Promise<UserEntity> {
    const orgname = user.org.name;
    const _syncronize_client_db = await getDBConnection(orgname, true, true);

    const adminRole = await createRoleAndPermissions(orgname);
    const asAdmin = { ...user, roles: [{ id: adminRole.id }] };
    const clientUserResouceService = await getResourceService<
      UserEntity,
      CreateUserDTO,
      UpdateUserDTO
    >('users', orgname);
    return await clientUserResouceService.create(new CreateUserDTO(asAdmin));
  }

  async login({ email, password }: LoginDTO): Promise<string> | never {
    await this.validate(LoginDTO, { email, password });

    const foundUser = await this.findOne({ where: { email } });

    if (!foundUser?.password) throw new NotFoundException('Acount not found!');

    const isPasswordMatch = await compare(password, foundUser.password);

    if (!isPasswordMatch) throw new UnauthorizedException('Wrong Password!');

    const tokenPayload = toPlainObject(foundUser);

    return this.jwt.sign(tokenPayload);
  }
}
