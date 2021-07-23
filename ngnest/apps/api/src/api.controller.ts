import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, Organization, Permission, Role, User } from '@authdare/models'
import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class ApiController {

  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Organization) private readonly org: Repository<Organization>,
    @InjectRepository(Permission) private readonly permission: Repository<Permission>,
    @InjectRepository(Role) private readonly role: Repository<Role>,
    private readonly apiService: ApiService,
    private readonly jwt: JwtService
  ) { }

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }


  @Post("signup")
  subscribe(@Body() userData: CreateUserDto) {
    return new Promise(async (res, rej) => {

      try {

        const permit = this.permission.create({ resource: 'all', method: 'all' })
        const savedPermit = await this.permission.save(permit)

        const orgC = this.org.create({ organizationName: 'ahmet' });
        const savedOrg = await this.org.save(orgC);

        setTimeout(async () => {
          const r = this.role.create({ roleName: 'admin', permissions: [{ id: savedPermit.id }] })

          const savedRole = await this.role.save(r);

        }, 2000);

        setTimeout(async () => {
          const created = await this.user.create(userData);
          const result = await this.user.save(created);
          res(result);
        }, 4000);
      } catch (err) {
        res(err);
      }
    })
  }
}
