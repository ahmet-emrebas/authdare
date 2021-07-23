import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';



@Exclude()
export class CreatePermissionDto extends BaseDto<CreateRoleDto> {
    @Expose() @ApiProperty({}) method: string;
    @Expose() @ApiProperty({}) resource: string
}

@Exclude()
export class CreateRoleDto extends BaseDto<CreateRoleDto> {
    @Expose() @ApiProperty({}) rolename: string;
    @Expose() @ApiProperty({}) permissions: CreatePermissionDto[]
}