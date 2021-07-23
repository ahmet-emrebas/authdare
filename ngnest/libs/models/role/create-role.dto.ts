import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';



@Exclude()
export class CreatePermissionDto extends BaseDto<CreateRoleDto> {
    @Expose() @ApiProperty({ default: 'GET' }) method: string;
    @Expose() @ApiProperty({ default: 'users' }) resource: string
}

@Exclude()
export class CreateRoleDto extends BaseDto<CreateRoleDto> {
    @Expose() @ApiProperty({ default: 'public' }) roleName: string;
    @Expose() @ApiProperty({ default: [{ id: 1, }, { id: 2 }] }) permissions: { id: number | string }[]
}