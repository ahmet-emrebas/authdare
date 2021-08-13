import { CommonConstructor } from '@authdare/common/class';
import { Injectable, SetMetadata } from '@nestjs/common';
import { IsIn, IsString, Length } from 'class-validator';

@SetMetadata(ClientDatabaseConfig.name, 'client')
@Injectable()
export class ClientDatabaseConfig extends CommonConstructor<ClientDatabaseConfig> {
    @IsString()
    @IsIn(['mysql', 'postgres', 'sqlite'])
    type?: string;

    @IsString()
    database?: string;

    @IsString()
    @Length(3, 100)
    username?: string;

    @IsString()
    @Length(6, 100)
    password?: string;
}
