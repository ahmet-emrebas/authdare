import { Module, Global, DynamicModule } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';
import { ProvideRepositories } from '@authdare/common/util';
import { v4 } from 'uuid';

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
                    name: v4(),
                    url,
                    type,
                    database,
                    entities: [EventEntity],
                    synchronize: true,
                    dropSchema: true,
                }),
            ],
            exports: [EventService],
        };
    }
}
