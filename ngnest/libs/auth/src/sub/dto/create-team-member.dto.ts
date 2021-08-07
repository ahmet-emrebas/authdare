import { ValidationPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsEmail, NotContains, ValidateNested } from 'class-validator';
import { BaseClass } from '@authdare/objects';
import { InitEach } from '@authdare/utils';
import { internet } from 'faker';

export const CreateTeamMemberValidationPipe = new ValidationPipe({ transform: true });

@Exclude()
export class CreateTeamMemberDTO extends BaseClass<CreateTeamMemberDTO> {
    @ApiProperty({ type: 'string', required: true, default: 'aemrebasus@gmail.com' })
    @Expose()
    @NotContains(' ')
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email!: string;

    @ApiProperty({
        required: false,
        default: ['akslueu-asufuaisd-asiufaisdf-asdfiasudf'],
    })
    @Expose()
    @ValidateNested({ each: true })
    readonly permissions!: string[];

    @Expose()
    @Transform(({ value }) => (value && value) || internet.password())
    readonly password!: string;

    @Expose()
    readonly orgname!: string;
}
