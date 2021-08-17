import { Module, Global, DynamicModule } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';
import { ConnectionModule } from '@authdare/common/db';

@Global()
@Module({})
export class EventModule {
    static configure(): DynamicModule {
        return {
            module: EventModule,
            imports: [ConnectionModule.configure('event', [EventEntity])],
            controllers: [EventController],
            providers: [EventService],
            exports: [EventService],
        };
    }
}
