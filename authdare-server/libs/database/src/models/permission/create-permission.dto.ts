import { DtoBase } from './../base/base';
import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsAlpha, IsIn, Length } from "class-validator";

const PermissionMethods = () => ['READ', 'WRITE', 'UPDATE', 'DELETE']
type TPermissionMethods = 'READ' | 'WRITE' | 'UPDATE' | 'DELETE'

export class CreatePermissionDto extends DtoBase<CreatePermissionDto> {
    static readonly className = "CreatePermissionDto";
    @ApiProperty() @IsAlpha() @Length(3, 20) resource: string;
    @ApiProperty() @IsIn(['READ', 'WRITE', 'UPDATE', 'DELETE']) method: TPermissionMethods;
    @ApiProperty() @IsAlpha(null, { each: true }) properties: string[];
}


export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    static readonly className = "UpdatePermissionDto";
}