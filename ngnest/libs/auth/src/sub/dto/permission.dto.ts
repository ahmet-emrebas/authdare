import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'get' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

@Exclude()
export class SubPermissionDTO {

    @Expose()
    @ApiProperty({ default: 'GET' })
    method!: HttpMethods;

    @Expose()
    @ApiProperty({ default: 'users' })
    resource!: string;

    constructor(permission: SubPermissionDTO) {
        Object.assign(this, permission);
    }
}