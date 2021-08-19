import { ColumnController } from './column.controller';
import { TableController } from './table.controller';
import { ResourceBuilderModule } from '@authdare/common/base';
import { ConnectionTokens } from '@authdare/common/db';
import { DatabaseController } from './database.controller';
import { DatabaseEntity } from './database.entity';
import { TableEntity } from './table.entity';
import { ColumnEntity } from './column.entity';

export const DatabaseModule = ResourceBuilderModule.configure(
    ConnectionTokens.CMS,
    [DatabaseEntity, TableEntity, ColumnEntity],
    [DatabaseController, TableController, ColumnController],
);
