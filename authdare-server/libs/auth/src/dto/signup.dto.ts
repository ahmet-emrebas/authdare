
import { internet, company } from 'faker';
import { IsNotBlank } from '@authdare/base/is-not-blank.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsEmail } from 'class-validator';
import { BaseDTO } from '@authdare/base';

@Exclude()
export class SignupDTO extends BaseDTO<SignupDTO> {

  @Expose()
  @ApiProperty({ default: internet.email(), required: true })
  @IsEmail()
  email?: string;

  @Expose()
  @ApiProperty({ default: internet.password(), required: true })
  @IsNotBlank()
  @Length(6, 100)
  password?: string;

  @ApiProperty({ default: company.companyName() })
  @IsNotBlank()
  @Length(3, 100)
  orgName: string;
}
