import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class LoginCredentialsDto {
    @ApiProperty({ nullable: false, type: 'string', maxLength: 20, minLength: 3 }) @Length(3, 20) username: string;
    @ApiProperty({ nullable: false, type: 'string', maxLength: 100, minLength: 6 }) @Length(6, 100) password: string
}