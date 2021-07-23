import {
  Blog,
  BlogContent,
  Category,
  Organization,
  Permission,
  Photo,
  Product,
  Profile,
  Project,
  Role,
  Sprint,
  Tag,
  Ticket,
  User,
} from '@authdare/models';
import {
  BlogModule,
  CategoryModule,
  OrganizationModule,
  PermissionModule,
  PhotoModule,
  ProductModule,
  ProfileModule,
  ProjectModule,
  RoleModule,
  SprintModule,
  TagModule,
  TicketModule,
  UserModule,

} from '@authdare/modules';
import { AuthGuard, AuthMiddleware } from '@authdare/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseConfig } from '@authdare/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      entities: [
        Blog,
        BlogContent,
        Category,
        Organization,
        Permission,
        Photo,
        Product,
        Profile,
        Project,
        Role,
        Sprint,
        Tag,
        Ticket,
        User,
      ],
    }),
    TypeOrmModule.forFeature([
      Blog,
      BlogContent,
      Category,
      Organization,
      Permission,
      Photo,
      Product,
      Profile,
      Project,
      Role,
      Sprint,
      Tag,
      Ticket,
      User,
    ]),
    BlogModule,
    CategoryModule,
    OrganizationModule,
    PermissionModule,
    PhotoModule,
    ProductModule,
    ProfileModule,
    ProjectModule,
    RoleModule,
    SprintModule,
    TagModule,
    TicketModule,
    UserModule,

    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [ApiController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ApiService,
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
