import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, TransformPlainToClass, Type } from "class-transformer";
import { IsEmail, Length, NotContains, ValidateNested } from "class-validator";
import { BaseClass } from '@authdare/objects';
import { Role } from "@authdare/auth/role";
import { InitEach, Trim } from "@authdare/utils";
import { internet } from 'faker'

export const CreateTeamMemberValidationPipe = new ValidationPipe({ transform: true });


@Exclude()
export class CreateTeamMemberDTO extends BaseClass<CreateTeamMemberDTO> {

    @ApiProperty({ type: 'string', required: true, default: 'aemrebasus@gmail.com' })
    @Expose()
    @NotContains(' ')
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email!: string;

    @ApiProperty({
        required: false, default: [
            { name: 'role_name', permissions: [{ method: 'get', resource: 'users' }] }
        ] as Role[]
    })
    @Expose()
    @ValidateNested({ each: true })
    @InitEach(Role)
    @Type(() => Role)
    readonly roles!: Role[];


    @Expose()
    @Transform(({ value }) => value && value || internet.password())
    readonly password!: string;

    @Expose()
    readonly orgname!: string

}


