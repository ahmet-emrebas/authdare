import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsOptional, Length } from "class-validator";
import { SubPermissionDTO } from "./permission.dto";

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
    transformOptions: { groups: [Groups.SIGNUP] },
    groups: [Groups.SIGNUP]
});


@Exclude()
export class CreateSubDTO {

    @ApiProperty({ type: 'string', required: true })
    @Expose()
    @IsEmail({}, { message: 'Email must be an email!' })
    email!: string;

    @ApiProperty({ type: 'string', required: true })
    @Expose()
    @Length(6, 100, { message: 'Password must be 6-100 characters!' })
    password!: string

    @ApiProperty({ type: 'string', required: true })
    @Expose()
    @IsOptional({ groups: [Groups.CREATE_TEAM_MEMBER] })
    @Length(3, 50)
    orgname!: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [Groups.CREATE_TEAM_MEMBER] })
    @IsOptional({ groups: [Groups.SIGNUP] })
    @Length(0, 40)
    permissions!: SubPermissionDTO[];

}

