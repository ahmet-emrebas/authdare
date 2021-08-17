import { Exclude, Expose } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { ConnectionOptions } from 'typeorm';
import { CommonConstructor } from '../base';
import { t } from '../type';

@Exclude()
export class DatabaseOptions extends CommonConstructor<DatabaseOptions> {
    @Expose()
    @IsOptional()
    options?: ConnectionOptions;

    /**
     * @local the connection options is in req.locals.connection
     * @remote the coonection options comes from external, which is defined in req.locals.remoteConnectionURL.
     */
    @Expose()
    @IsIn(['local', 'remote'])
    strategy: 'local' | 'remote' = t<'local' | 'remote'>();

    /**
     * If strategy is remote, this URL will be used to get connection options.
     */
    @Expose()
    @IsOptional()
    url?: string;
}
