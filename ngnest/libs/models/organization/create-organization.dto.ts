import { Expose, Exclude } from 'class-transformer';
import { BaseDto } from "@authdare/core";
import { ApiProperty } from "@nestjs/swagger";


@Exclude()
export class CreateOrganizationDto extends BaseDto<CreateOrganizationDto> {
    @Expose() @ApiProperty() organizationName: string;

}