import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsEmail, IsOptional, Length } from "class-validator";
import { assignIn, cloneDeep } from "lodash";
import { SubPermissionDTO } from "./role-permission.dto";

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
    readonly email!: string;

    @ApiProperty({ type: 'string', required: true })
    @Expose()
    @Length(6, 100, { message: 'Password must be 6-100 characters!' })
    readonly password!: string

    @ApiProperty({ type: 'string', required: true })
    @Expose()
    @IsOptional({ groups: [Groups.CREATE_TEAM_MEMBER] })
    @Length(3, 50)
    readonly orgname!: string;

    @ApiProperty({ required: false })
    @Expose({ name: 'permissions', groups: [Groups.CREATE_TEAM_MEMBER] })
    @IsOptional({ groups: [Groups.SIGNUP] })
    @Length(0, 40)
    readonly permissions!: SubPermissionDTO[];

    constructor(obj: CreateSubDTO) {
        Object.assign(this, cloneDeep(obj));
    }

}


