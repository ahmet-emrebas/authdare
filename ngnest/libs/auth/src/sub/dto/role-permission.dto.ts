import { BaseClass } from "@authdare/objects";
import { ImmutableRecord } from "@authdare/objects/immutable-record";
import { Injectable } from "@nestjs/common";
import { ApiProperty, } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'get' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'


@Exclude()
export class SubPermissionDTO extends BaseClass<SubPermissionDTO> {

    @Expose()
    @ApiProperty({ default: 'GET' })
    readonly method!: HttpMethods;

    @Expose()
    @ApiProperty({ default: 'users' })
    readonly resource!: string;
}



export class Role<Names extends string = string> extends BaseClass<Role<Names>> {
    @Expose()
    readonly name!: Names;

    @Expose({ name: 'permissions' })
    readonly permissions!: ImmutableRecord<SubPermissionDTO>;


}


@Injectable({})
export class RoleManager<Names extends string = string> {
    private roles!: Role[];

    private constructor(roles: Role<Names>[]) {
        this.roles = roles;
    }

    public role(name: Names) {
        return this.roles.find(e => e.name == name);
    }

    static init<Names extends string = string>(roles: Role<Names>[]) {
        return new RoleManager<Names>(roles)
    }

}

