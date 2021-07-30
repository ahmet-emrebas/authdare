
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { range } from 'lodash';
import { company, internet } from 'faker'
import { UserEntity } from './entities';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';
import { SignupUserController } from './user-signup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, SignupUserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  constructor(private userService: UserService) { }

  async configure(consumer: MiddlewareConsumer) {
    await this.seedDatabase();
  }

  private static fakeUser(): CreateUserDTO {
    return {
      email: internet.email(),
      password: internet.password(),
      orgname: company.companyName(),
      permissions: ['get:tasks']
    }
  }

  private async seedDatabase() {
    for (let _ of range(1, 11)) await this.userService.create(UserModule.fakeUser())
    setTimeout(async () => {
      for (let _ of range(1, 11)) await this.userService.create(UserModule.fakeUser())
    }, 3000);
  }

}
