import { ApiProperty, PartialType } from "@nestjs/swagger";
import { EntityBase } from "../base";

export class CreateRoleDto extends EntityBase<CreateRoleDto> {
    static readonly className = "CreateRoleDto";
    @ApiProperty({ default: 'admin' }) role: string;
    @ApiProperty({ default: [{ id: 1 }, { id: 2 }] }) permissions: { id: number }[]
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    static readonly className = "UpdateRoleDto";
}