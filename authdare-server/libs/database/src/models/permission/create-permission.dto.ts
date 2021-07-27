import { BaseDto } from './../base/base';
import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsAlpha, IsIn, Length } from "class-validator";

export const PermissionMethods = () => ['READ', 'WRITE', 'UPDATE', 'DELETE']
export type TPermissionMethods = 'READ' | 'WRITE' | 'UPDATE' | 'DELETE'

export class CreatePermissionDto extends BaseDto<CreatePermissionDto> {
    @ApiProperty() @IsAlpha() @Length(3, 20) resource: string;
    @ApiProperty() @IsIn(['READ', 'WRITE', 'UPDATE', 'DELETE']) method: TPermissionMethods;
    @ApiProperty() @IsAlpha(null, { each: true }) properties: string[];
}


export class UpdatePermissionDto extends PartialType(CreatePermissionDto) { }