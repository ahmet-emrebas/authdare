import { internet } from 'faker';
import { BaseDTO } from "@authdare/base";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";

@Exclude()
export class LoginDTO extends BaseDTO<LoginDTO> {
    @Expose() @ApiProperty({ default: internet.email(), required: true }) @IsEmail() email: string;
    @Expose() @ApiProperty({ default: internet.password(), required: true }) @Length(6, 100) password: string;
}