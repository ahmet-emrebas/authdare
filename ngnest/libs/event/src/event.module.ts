import { Module, Global } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';
import { ProvideRepositories } from '@authdare/common/util';
import { v4 } from 'uuid';

@Global()
@Module({
    controllers: [EventController],
    providers: [
        EventService,
        ...ProvideRepositories({
            name: v4(),
            type: 'sqlite',
            database: './event/event.sqlite',
            entities: [EventEntity],
            synchronize: true,
            dropSchema: true,
        }),
    ],
    exports: [EventService],
})
export class EventModule {}
