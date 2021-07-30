
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientauthController } from './clientauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { range } from 'lodash';
import { company, internet } from 'faker'
import { ClientauthEntity } from './entities';
import { ClientauthService } from './clientauth.service';
import { CreateClientauthDTO } from './dto';
import { SignupClientauthController } from './clientauth-signup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientauthEntity])],
  controllers: [ClientauthController, SignupClientauthController],
  providers: [ClientauthService]
})
export class ClientauthModule implements NestModule {
  constructor(private clientauthService: ClientauthService) { }

  async configure(consumer: MiddlewareConsumer) {
    await this.seedDatabase();
  }

  private static fakeClientauth(): CreateClientauthDTO {
    return {
      email: internet.email(),
      password: internet.password(),
      orgname: company.companyName(),
      permissions: ['get:tasks']
    }
  }

  private async seedDatabase() {
    for (let _ of range(1, 11)) await this.clientauthService.create(ClientauthModule.fakeClientauth())
    setTimeout(async () => {
      for (let _ of range(1, 11)) await this.clientauthService.create(ClientauthModule.fakeClientauth())
    }, 3000);
  }

}
