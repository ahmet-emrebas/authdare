import { internet } from 'faker';
import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateOrgDTO extends BaseDTO<CreateOrgDTO> {
    static readonly className = "CreateOrgDTO";

    @Expose()
    @ApiProperty({ default: internet.email(), required: true, })
    name: string;



}