import { BaseDto, RelationID } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { MaxLength } from 'class-validator';


@Exclude()
export class CreateRoleDto extends BaseDto<CreateRoleDto> {
    @Expose()
    @ApiProperty({ default: 'public' })
    roleName: string;

    @Expose()
    @ApiProperty({ nullable: true, default: [{ id: 1, }, { id: 2 }] })
    permissions: RelationID[]
}


@Exclude()
export class CreatePermissionDto extends BaseDto<CreateRoleDto> {
    @Expose()
    @ApiProperty({ type: 'string', default: 'Read Users', maxLength: 20 })
    @MaxLength(20)
    label: string;

    @Expose()
    @ApiProperty({ type: 'string', default: 'GET', maxLength: 20 })
    @MaxLength(20)
    method: string;

    @Expose()
    @ApiProperty({ type: 'string', default: 'users', maxLength: 20 })
    @MaxLength(20)
    resource: string

}

