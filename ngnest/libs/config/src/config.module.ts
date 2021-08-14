import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './config.entity';
import { ProvideRepositories } from '@authdare/common/util';
import { v4 } from 'uuid';

@Global()
@Module({
    controllers: [ConfigController],
    providers: [
        ConfigService,
        ...ProvideRepositories({
            name: v4(),
            type: 'sqlite',
            database: './config/config.sqlite',
            entities: [ConfigEntity],
            synchronize: true,
            dropSchema: true,
        }),
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
