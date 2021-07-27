import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ default: 'admin' }) role: string;
    @ApiProperty({ default: [{ id: 1 }, { id: 2 }] }) permissions: { id: number }[]
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) { }