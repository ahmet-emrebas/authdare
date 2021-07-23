import { BaseDto } from '@authdare/core';
import { CreateOrganizationDto, CreateProfileDto, CreateRoleDto } from '@authdare/models';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';


@Exclude()
export class CreateUserDto extends BaseDto<CreateUserDto> {

    @Expose() @ApiProperty({}) firstName: string;
    @Expose() @ApiProperty({}) lastName: string;
    @Expose() @ApiProperty({}) password: string;
    @Expose() @ApiProperty({}) email: string;
    @Expose() @ApiProperty({}) phone: string;
    @Expose() @ApiProperty({}) organization: CreateOrganizationDto;
    @Expose() @ApiProperty({}) profile: CreateProfileDto;
    @Expose() @ApiProperty({}) roles: CreateRoleDto[];

}