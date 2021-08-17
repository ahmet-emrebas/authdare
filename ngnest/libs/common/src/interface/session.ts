import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { DatabaseOptions } from '.';
import { CommonConstructor } from '../base';
import { t } from '../type';
import { UserDetails } from './user-details';

@Exclude()
export class Session extends CommonConstructor<Session> {
    @Expose()
    @IsNotEmpty()
    uuid: string = t<string>();

    @Expose()
    @IsNotEmpty()
    type: 'public' | 'client' = t<'public' | 'client'>();

    @Expose()
    @IsNotEmpty()
    lang: string = t<string>();

    @Expose()
    @ValidateNested()
    @Type(() => UserDetails)
    details: UserDetails = t<UserDetails>();

    @Expose()
    @IsNotEmpty()
    services: string[] = t<string[]>();

    @Expose()
    @IsNotEmpty()
    permissions: string[] = t<string[]>();

    @Expose()
    @ValidateNested()
    @Type(() => DatabaseOptions)
    internalDB: DatabaseOptions = t<DatabaseOptions>();

    @Expose()
    @ValidateNested()
    @Type(() => DatabaseOptions)
    monitorDB: DatabaseOptions = t<DatabaseOptions>();

    constructor(obj: Record<string, any>) {
        super();
    }
}
