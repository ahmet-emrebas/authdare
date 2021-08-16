import { Module, Global, DynamicModule } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';
import { ProvideRepositories } from '@authdare/common/util';

@Global()
@Module({})
export class EventModule {
    static configure(): DynamicModule {
        return {
            module: EventModule,
            controllers: [EventController],
            providers: [EventService, ...ProvideRepositories([EventEntity])],
            exports: [EventService],
        };
    }
}
