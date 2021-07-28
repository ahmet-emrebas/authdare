
import { company } from 'faker';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateOrgDTO, CreateUserDTO } from '@authdare/models';

@Exclude()
export class SignupDTO extends CreateUserDTO {
    @Expose()
    @ApiProperty({ required: true, default: { name: company.companyName() } })
    @ValidateNested()
    @Type(() => CreateOrgDTO)
    org: CreateOrgDTO;
}