import { CreateRoleDTO } from './../role/create-role.dto';
import { internet } from 'faker';
import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';




@Exclude()
export class CreateUserDTO extends BaseDTO<CreateUserDTO> {
    static readonly className = "CreateUserDTO";

    @Expose()
    @ApiProperty({ default: internet.email(), required: true, })
    @IsEmail()
    email: string;

    @Expose()
    @ApiProperty({ default: internet.password(), required: true, })
    @MaxLength(300)
    password: string;

    @Expose()
    @ApiProperty({ default: [], required: true, })
    roles: { id: number }[];
}