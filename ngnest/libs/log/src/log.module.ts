import { Module, Global } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';
import { ProvideRepositories } from '@authdare/common/util';
import { v4 } from 'uuid';

@Global()
@Module({
    controllers: [LogController],
    providers: [
        LogService,
        ...ProvideRepositories({
            name: v4(),
            type: 'sqlite',
            database: './log/log.sqlite',
            entities: [LogEntity],
            synchronize: true,
            dropSchema: true,
        }),
    ],
    exports: [LogService],
})
export class LogModule {}
