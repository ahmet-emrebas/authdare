import { Trim } from '@authdare/utils';
import { RolesManager, Role } from '../../role';
import { BaseClass } from "@authdare/objects";
import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsEmail, Length, NotContains, ValidateNested } from "class-validator";
import { SnakeCase } from '@authdare/utils/snake-case';

enum Groups {
    SIGNUP = 'SIGNUP',
    CREATE_TEAM_MEMBER = 'CREATE_TEAM_MEMBER'
}

export const SubCreateTeamValidation = new ValidationPipe({
    transform: true,
    transformOptions: { groups: [Groups.CREATE_TEAM_MEMBER], },
    groups: [Groups.CREATE_TEAM_MEMBER]
});

export const SubSignupValidationPipe = new ValidationPipe({
    transform: true,
    transformOptions: { groups: [Groups.SIGNUP] }
});


@Exclude()
export class CreateAuthUserDTO extends BaseClass<CreateAuthUserDTO> {

    @ApiProperty({ type: 'string', required: true, default: 'email@gmail.com' })
    @Expose()
    @Trim()
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email!: string;

    @ApiProperty({ type: 'string', required: true, default: 'password' })
    @Expose()
    @NotContains(' ', { message: 'Password should not contain space!' })
    @Length(6, 100, { message: 'Password must be 6-100 characters!' })
    readonly password!: string

    @ApiProperty({ type: 'string', required: true, default: 'orgname' })
    @Expose()
    @Trim()
    @SnakeCase()
    @Length(3, 50)
    readonly orgname!: string;

    @ApiProperty({ required: false, default: [{ name: 'rolename', permissions: [{ method: 'get', resource: 'users' }] }] })
    @Expose()
    @Transform(({ value }) => [RolesManager.clientAdmin()], { groups: [Groups.SIGNUP] })   // When user signup, then give him Client Admin Roles
    @ValidateNested({ each: true })
    @Type(() => Role)
    readonly roles!: Role[];

}


