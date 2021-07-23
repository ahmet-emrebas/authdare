import { ApiProperty } from '@nestjs/swagger';
export class AuthUser {
    @ApiProperty()
    orgname: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;

}