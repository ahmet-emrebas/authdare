import { ClientauthService } from './clientauth.service';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from "@nestjs/common";
import { ClientauthEntity } from './entities'
import { CreateClientauthDTO, TransformAndValidateCreateClientauthPipe } from './dto';
import { BadRequestException, Logger } from '@nestjs/common';
import { Connection, createConnection, getConnection } from 'typeorm';
import { importResourceModules } from '@authdare/utils/module';
import { resourcePath } from '@authdare/base/controller';

const RESOURCE_PATH = 'client/auth';

@ApiTags('Client Signup')
@Controller(resourcePath(RESOURCE_PATH))
export class SignupClientauthController {

    constructor(private clientauthService: ClientauthService) { }

    // @Post('join')
    // async joinTeam(@Body() joinDto: CreateJoinDTO) {
    //     const transformed = plainToClass(CreateJoinDTO, joinDto);
    //     console.log(transformed);
    // }

    @Post('signup')
    async signup(@Body(TransformAndValidateCreateClientauthPipe) createSignupDTO: CreateClientauthDTO) {
        const found = await this.clientauthService.find({ where: { orgname: createSignupDTO.orgname } })
        if (found?.count >= 1) {
            if (found.count > 1) {
                Logger.error(`There are dublicate orgname in database, corresponding ID: ${found.data[0]?.id}`)
            }
            throw new BadRequestException(`Organization ${found.data[0]?.orgname} already exist. Please go to join form if you want to join your organization!`)
        }
        createSignupDTO.status = 'ACTIVE';
        createSignupDTO.permissions = ['client'];
        const created = await this.clientauthService.create(createSignupDTO);
        const userDetails = await this.createClientDatabase(created)
        return { message: `Welcome! We created your account ${created.email}`, userDetails }
    }


    async createClientDatabase(clientauthUser: ClientauthEntity): Promise<ClientauthEntity> {
        const orgname = clientauthUser.orgname;

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

        const userRepo = await con.getRepository(ClientauthEntity);

        const createdClientauthUser = await userRepo.create(clientauthUser)
        const savedClientauthUser = await userRepo.save(createdClientauthUser);
        console.log(savedClientauthUser);
        return savedClientauthUser;
    }
}