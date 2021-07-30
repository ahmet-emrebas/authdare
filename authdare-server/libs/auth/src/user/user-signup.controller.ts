import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from "@nestjs/common";
import { UserEntity } from './entities'
import { CreateUserDTO, TransformAndValidateCreateUserPipe } from './dto';
import { BadRequestException, Logger } from '@nestjs/common';
import { Connection, createConnection, getConnection } from 'typeorm';
import { importResourceModules } from '@authdare/utils/module';
import { resourcePath } from '@authdare/base/controller';

const RESOURCE_PATH = 'client/auth';

@ApiTags('Client Signup')
@Controller(resourcePath(RESOURCE_PATH))
export class SignupUserController {

    constructor(private userService: UserService) { }

    @Post(':orgname/join')
    async joinTeam(@Body() joinDto: CreateUserDTO) {

    }

    @Post('signup')
    async signup(@Body(TransformAndValidateCreateUserPipe) createSignupDTO: CreateUserDTO) {
        const found = await this.userService.find({ where: { orgname: createSignupDTO.orgname } })
        if (found?.count >= 1) {
            if (found.count > 1) {
                Logger.error(`There are dublicate orgname in database, corresponding ID: ${found.data[0]?.id}`)
            }
            throw new BadRequestException(`Organization ${found.data[0]?.orgname} already exist. Please go to join form if you want to join your organization!`)
        }
        createSignupDTO.status = 'ACTIVE';
        createSignupDTO.permissions = ['client'];
        const created = await this.userService.create(createSignupDTO);
        const userDetails = await this.createClientDatabase(created)
        return { message: `Welcome! We created your account ${created.email}`, userDetails }
    }


    async createClientDatabase(userUser: UserEntity): Promise<UserEntity> {
        const orgname = userUser.orgname;

        let con: Connection;
        try {
            con = await getConnection(orgname);
        } catch (err) {
            // 
        }

        const modules = await importResourceModules();
        const entities = modules.map(e => e.entity);
        con = await createConnection({
            name: orgname,
            type: "sqlite",
            database: `database/${orgname}/main.sqlite`,
            entities,
            synchronize: true,
            dropSchema: true,
        });

        const userRepo = await con.getRepository(UserEntity);

        const createdUserUser = await userRepo.create(userUser)
        const savedUserUser = await userRepo.save(createdUserUser);
        console.log(savedUserUser);
        return savedUserUser;
    }
}