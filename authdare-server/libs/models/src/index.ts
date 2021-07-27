import { UpdateDatabaseDto } from './database/create-database.dto';
import { CreateOrgDto, UpdateOrgDto } from './org/create-org.dto';
import { User } from '@authdare/models';
import { ClassConstructor } from "class-transformer";
import { CreateUserDto, UpdateUserDto } from './user';
import { CreateDatabaseDto, Database } from './database';

export * from "./base";
export * from "./database";
export * from "./org";
export * from "./user";


export const ModelsMap: {
    [ke: string]: {
        entity: any,
        createDTO: ClassConstructor<any>,
        updateDTO: ClassConstructor<any>
    }
} = {

    users: {
        entity: User,
        createDTO: CreateUserDto,
        updateDTO: UpdateUserDto
    },
    orgs: {
        entity: User,
        createDTO: CreateOrgDto,
        updateDTO: UpdateOrgDto
    },
    databases: {
        entity: Database,
        createDTO: CreateDatabaseDto,
        updateDTO: UpdateDatabaseDto
    },


}