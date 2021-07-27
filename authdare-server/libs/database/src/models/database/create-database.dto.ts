import { DtoBase } from './../base/base';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDatabaseDto extends DtoBase<CreateDatabaseDto> {
    static readonly className = "CreateDatabaseDto";
    @ApiProperty({ default: 'authdare_connection' }) name: string;
    @ApiProperty({ default: 'postgres' }) type: 'sqlite' | 'postgres' | 'mysql';
    @ApiProperty({ default: 'authdare' }) database: string;
    @ApiProperty({ default: 'localhost' }) host?: string;
    @ApiProperty({ default: 3306 }) port?: number;
    @ApiProperty({ default: 'postgres' }) username?: string;
    @ApiProperty({ default: 'password' }) password?: string;
}

export class UpdateDatabaseDto extends PartialType(CreateDatabaseDto) {
    static readonly className = "UpdateDatabaseDto";
}