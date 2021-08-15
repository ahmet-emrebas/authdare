import { Module, Global, DynamicModule } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';
import { ProvideRepositories, uuid, waitFor } from '@authdare/common/util';

@Global()
@Module({})
export class EventModule {
    static async configure(
        type = 'postgres' as any,
        url = 'postgres://postgres:password@localhost',
        database = 'event',
    ): Promise<DynamicModule> {
        return {
            module: EventModule,
            controllers: [EventController],
            providers: [
                EventService,
                ...ProvideRepositories({
                    name: uuid(),
                    url,
                    type,
                    database,
                    entities: [EventEntity],
                    synchronize: true,
                }),
            ],
            exports: [EventService],
        };
    }
}
