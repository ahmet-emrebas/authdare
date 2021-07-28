import { internet } from 'faker';
import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsIn, MaxLength } from 'class-validator';

export enum ROLE {
    'DEV' = 'DEV',
    'QA' = 'QA',
    'PM' = 'PM',
    'SM' = 'SM'
}

@Exclude()
export class CreateUserDTO extends BaseDTO<CreateUserDTO> {
    static className = "CreateUserDTO";

    @Expose()
    @ApiProperty({ default: internet.email(), required: true, })
    @IsEmail()
    email: string;

    @Expose()
    @ApiProperty({ default: internet.password(), required: true, })
    @MaxLength(300)
    password: string;

    @Expose()
    @ApiProperty({ default: ROLE.PM, required: true, })
    @IsIn([ROLE.DEV, ROLE.QA, ROLE.PM, ROLE.SM])
    role: string;

}