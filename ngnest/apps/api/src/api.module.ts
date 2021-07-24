import { OrganizationService } from './../../../libs/modules/organization/organization.service';

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
  PermissionService,
  PhotoModule,
  ProductModule,
  ProfileModule,
  ProjectModule,
  RoleModule,
  RoleService,
  SprintModule,
  TagModule,
  TicketModule,
  UserModule,
  UserService,

} from '@authdare/modules';
import { AuthGuard, AuthMiddleware } from '@authdare/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseConfig } from '@authdare/config';
import {
  Logger,
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
    // BlogModule,
    // CategoryModule,
    OrganizationModule,
    PermissionModule,
    PhotoModule,
    // ProductModule,
    ProfileModule,
    // ProjectModule,
    RoleModule,
    // SprintModule,
    // TagModule,
    // TicketModule,
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
  constructor(
    private roleService: RoleService,
    private permisionService: PermissionService,
    private organizationService: OrganizationService,
    private userService: UserService,
  ) {

  }
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    try {

      await this.initRolesAndPermissions()
    } catch (err) {
      Logger.error(err);
    }
  }



  async initRolesAndPermissions() {

    for (let resouce of ['users', 'organizations', 'projects', 'photos', 'blogs', 'categories', 'profiles']) {
      await this.permisionService.save({ label: `Read ${resouce}`, method: `GET`, resource: `${resouce}` })
      await this.permisionService.save({ label: `Write ${resouce}`, method: `POST`, resource: `${resouce}` })
      await this.permisionService.save({ label: `Update ${resouce}`, method: `PATCH`, resource: `${resouce}` })
      await this.permisionService.save({ label: `Delete ${resouce}`, method: `PATCH`, resource: `${resouce}` })
    }

    const adminRole = await this.roleService.save({
      roleName: 'Admin',
      permissions: (await this.permisionService.find()).map(e => ({ id: e.id }))
    })


    await this.roleService.save({
      roleName: 'Resource Reader',
      permissions: (await this.permisionService.find()).filter(e => e.method == 'GET').map(e => ({ id: e.id }))
    })

    await this.roleService.save({
      roleName: 'Blog Reader',
      permissions: (await this.permisionService.find()).filter(e => e.method == 'GET' && e.resource == 'blogs').map(e => ({ id: e.id }))
    })

    const authdareOrg = await this.organizationService.save({ organizationName: 'authdare' })

    setTimeout(async () => {

      const user = await this.userService.save({
        firstName: 'Ahmet',
        lastName: 'Emrebas',
        email: 'authdare@gmail.com',
        password: 'password',
        phone: '832 874 2422',

        roles: [
          { id: adminRole.id }
        ],
        organization: {
          id: authdareOrg.id
        }
      })

    }, 1000)
  }




}
