import { InitEach } from '@authdare/utils';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsRoleNameValid } from "./is-role-name-valid";
import { Permission } from '.';
import { BaseClass } from '@authdare/objects';
import { IPermission, IRole } from '@authdare/interfaces';

@Exclude()
export class Role extends BaseClass<Role> implements IRole {


    @ApiProperty({ default: 'admin' })
    @IsRoleNameValid()
    @Expose()
    readonly name!: string;

    @ApiProperty({ default: [{ method: 'get', resource: 'users' }] })
    @Expose()
    @ValidateNested({ each: true })
    @InitEach(Permission)
    @Type(() => Permission)
    readonly permissions!: IPermission[];

}
