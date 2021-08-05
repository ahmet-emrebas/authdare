import { IPermission, IRole } from "@authdare/interfaces";
import { BaseClass } from "@authdare/objects";
import { InitEach, Trim } from "@authdare/utils";
import { ApiProperty, } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsRoleNameValid } from "./is-role-name-valid";

@Exclude()
export class Permission extends BaseClass<Permission> implements IPermission {

    @ApiProperty({ default: 'get' })
    @Expose()
    @Trim()
    readonly method!: "get" | "post" | "patch" | "delete" | string;

    @Expose()
    @ApiProperty({ default: 'users' })
    @Trim()
    readonly resource!: string;


}


@Exclude()
export class RoleDTO extends BaseClass<RoleDTO> implements IRole {


    @ApiProperty({ default: 'admin' })
    @IsRoleNameValid()
    @Expose()
    readonly name!: string;

    @ApiProperty({ default: [{ method: 'get', resource: 'users' }] })
    @Expose()
    @InitEach(Permission)
    readonly permissions!: Permission[];
}



