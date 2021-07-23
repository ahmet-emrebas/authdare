import { BaseDto } from '@authdare/core';
import { CreateOrganizationDto, CreateProfileDto, CreateRoleDto } from '@authdare/models';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmptyObject, IsObject, IsPhoneNumber, IsString, Length, ValidateNested } from 'class-validator';
import { name, internet, phone } from 'faker'

@Exclude()
export class CreateUserDto extends BaseDto<CreateUserDto> {

    @Expose() @ApiProperty({
        type: 'string',
        required: true,
        nullable: false,
        maxLength: 50,
        minLength: 1,
        default: name.firstName()
    })
    @IsString()
    @Length(3, 50)
    firstName: string;

    @Expose() @ApiProperty({
        type: 'string',
        required: true,
        nullable: false,
        maxLength: 50,
        minLength: 1,
        default: name.lastName()
    })
    @IsString()
    @Length(3, 50)
    lastName: string;


    @Expose() @ApiProperty({
        type: 'string',
        required: true,
        nullable: false,
        maxLength: 100,
        minLength: 6,
        default: internet.password()
    })
    @IsString()
    @Length(6, 100)
    password: string;

    @Expose() @ApiProperty({
        type: 'string',
        required: true,
        nullable: false,
        default: internet.email()
    })
    @IsEmail()
    email: string;



    @Expose()
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        maxLength: 20,
        minLength: 10,
        default: phone.phoneNumber()
    })
    phone: string;


    @Expose()
    @ApiProperty({
        nullable: false,
        required: true,
        default: { "id": 1 }
    })
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateOrganizationDto)
    organization: CreateOrganizationDto;

    @Expose()
    @ApiProperty({
        nullable: true,
        default: { photo: '/assets/img/default-profile.png' }
    })
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateProfileDto)
    profile: CreateProfileDto;


    @Expose()
    @Expose()
    @ApiProperty({
        nullable: true,
        default: {
            roleName: 'none', permissions: [{
                method: "GET",
                resource: "users"
            }]
        }
    })
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateRoleDto)
    roles: CreateRoleDto[];

}