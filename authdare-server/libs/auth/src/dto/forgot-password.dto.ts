import { ApiProperty } from '@nestjs/swagger';
import { IsIn, MaxLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ default: 'email' }) @IsIn(['email', 'phone']) contactType:
    | 'phone'
    | 'email';
  @ApiProperty({ default: 'email@email.com' }) @MaxLength(20) contact: string;
}
