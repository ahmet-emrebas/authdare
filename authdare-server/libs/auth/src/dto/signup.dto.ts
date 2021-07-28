import { internet, company } from 'faker';
import { BaseDTO } from "@authdare/base";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";

@Exclude()
export class SignupDTO extends BaseDTO<SignupDTO> {
    @Expose() @ApiProperty({ required: true, default: internet.email() }) @IsEmail() email: string;
    @Expose() @ApiProperty({ required: true, default: internet.password() }) @Length(6, 100) password: string;
    @Expose() @ApiProperty({ required: true, default: company.companyName() }) @Length(3, 20) orgname: string;
}