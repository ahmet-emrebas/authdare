
import { Controller, Get, Param, Post } from "@nestjs/common";
import {
    Connection, createConnection, EntitySchema,
    EntitySchemaColumnOptions, EntitySchemaIndexOptions,
    EntitySchemaRelationOptions, getConnection, OrderByCondition, SelectQueryBuilder
} from "typeorm";
import { EntitySchemaCheckOptions } from "typeorm/entity-schema/EntitySchemaCheckOptions";
import { EntitySchemaExclusionOptions } from "typeorm/entity-schema/EntitySchemaExclusionOptions";
import { EntitySchemaOptions } from "typeorm/entity-schema/EntitySchemaOptions";
import { EntitySchemaUniqueOptions } from "typeorm/entity-schema/EntitySchemaUniqueOptions";
import { TableType } from "typeorm/metadata/types/TableTypes";


@Controller(":orgname/:resource")
export class ResourceController {
    constructor() { }
    @Get()
    get(@Param("orgname") orgname: string, @Param("resource") resource: string) {

    }
}


@Controller("database")
export class DatabaseController {
    async createTable(orgname: string) {

    }


    @Post()
    async createDatabase(orgname: string): Promise<Connection> {
        throw new Error("Not implemetned");
    }


}