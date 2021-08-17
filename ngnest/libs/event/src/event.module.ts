import { EventEntity } from './event.entity';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ConnectionTokens, provideRepositories } from '@authdare/common/db';

@Global()
@Module({})
export class EventModule {
    static configure(resourceType: ConnectionTokens): DynamicModule {
        return {
            module: EventModule,
            controllers: [EventController],
            providers: [...provideRepositories(resourceType, [EventEntity]), EventService],
            exports: [EventService],
        };
    }
}
