import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentials {
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) email: string;
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) password: string;
}
