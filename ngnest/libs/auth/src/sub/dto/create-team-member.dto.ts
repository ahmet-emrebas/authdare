import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, Length, NotContains, ValidateNested } from "class-validator";
import { BaseClass } from '@authdare/objects';
import { ValidateForbiddenRoleNames } from "@authdare/auth/role";


export const CreateTeamMemberValidationPipe = new ValidationPipe({ transform: true });


@Exclude()
export class CreateTeamMemberDTO extends BaseClass<CreateTeamMemberDTO> {

    @ApiProperty({ type: 'string', required: true, default: 'email@gmail.com' })
    @Expose()
    @NotContains(' ')
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email!: string;

    @ApiProperty({ required: false, default: ['client_admin'] })
    @Expose()
    @ValidateNested({ each: true })
    @ValidateForbiddenRoleNames()
    @Length(1, 50)
    readonly roles!: string[];

}


