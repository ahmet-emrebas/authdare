import { ValidationPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, NotContains, ValidateNested } from 'class-validator';
import { internet } from 'faker';
import { cloneDeep } from 'lodash';

export const CreateTeamMemberValidationPipe = new ValidationPipe({ transform: true });

@Exclude()
export class CreateTeamMemberDTO {
    @ApiProperty({ type: 'string', required: true, default: 'aemrebasus@gmail.com' })
    @Expose()
    @NotContains(' ')
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email!: string;

    @ApiProperty({
        required: false,
        default: ['akslueu'],
    })
    @Expose()
    @ValidateNested({ each: true })
    readonly permissions!: string[];

    @Expose()
    @Transform(({ value }) => (value && value) || internet.password())
    readonly password!: string;

    @Expose()
    readonly orgname!: string;

    constructor(obj: CreateTeamMemberDTO) {
        Object.assign(this, cloneDeep(obj));
    }
}
