import { Organization, Profile, User, Product, Category, Role, Permission } from '@authdare/models';
import { AuthMiddleware } from '@authdare/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseConfig } from '@authdare/config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      entities: [Product, Organization, User, Profile, Product, Category, Role, Permission]
    }),
    TypeOrmModule.forFeature([Product, Organization, User, Profile, Product, Category, Role, Permission]),
    JwtModule.register({
      secret: 'secret'
    })
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

}
