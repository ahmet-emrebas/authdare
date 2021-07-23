
import { Organization, Profile, User, Product, Category, Role, Permission, Sprint, Project, Ticket } from '@authdare/models';
import { AuthGuard, AuthMiddleware } from '@authdare/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseConfig } from '@authdare/config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { APP_GUARD } from '@nestjs/core';
import { UserModule, OrganizationModule, RoleModule, PermissionModule } from '@authdare/modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      entities: [Product, Organization, User, Profile, Product, Category, Role, Permission, Project, Sprint, Ticket]
    }),
    TypeOrmModule.forFeature([Product, Organization, User, Profile, Product, Category, Role, Permission, Project, Sprint, Ticket]),
    UserModule,
    OrganizationModule,
    RoleModule,
    PermissionModule,
    JwtModule.register({
      secret: 'secret'
    })
  ],
  controllers: [ApiController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    ApiService],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

}
