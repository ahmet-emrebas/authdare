import { AuthSignupController } from './auth-signup.controller';
import { JwtModule } from '@nestjs/jwt';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { range } from 'lodash';
import { company, internet } from 'faker'
import { AuthEntity } from './entities';
import { AuthService } from './auth.service';
import { CreateAuthDTO } from './dto';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
    TypeOrmModule.forFeature([AuthEntity])
  ],
  controllers: [AuthController, AuthSignupController],
  providers: [AuthService]
})
export class AuthModule implements NestModule {
  constructor(private authService: AuthService) { }

  async configure(consumer: MiddlewareConsumer) {
    await this.seedDatabase();
  }

  private static fakeAuth(): CreateAuthDTO {
    return {
      email: internet.email(),
      password: internet.password(),
      orgname: company.companyName(),
      permissions: ['get:users']
    }
  }

  private async seedDatabase() {
    for (let _ of range(1, 11)) await this.authService.create(AuthModule.fakeAuth())
    setTimeout(async () => {
      for (let _ of range(1, 11)) await this.authService.create(AuthModule.fakeAuth())
    }, 3000);
  }

}
