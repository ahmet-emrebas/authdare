import { CommonConstructor } from '@authdare/common/class';
import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';
import { ProvideRepositories } from '@authdare/common/util';

export class EventModuleOptions extends CommonConstructor<EventModuleOptions> {
    type = 'postgres' as any;

    url = 'postgres://postgres:password@localhost/event';

    providers: Provider<any>[] = [];
    synchronize = true;
    dropSchema = false;
}

@Global()
@Module({})
export class EventModule {
    static async configure(options?: Partial<EventModuleOptions>): Promise<DynamicModule> {
        const { type, url, providers, synchronize, dropSchema } = {
            ...new EventModuleOptions(),
            ...options,
        };

        return {
            module: EventModule,
            controllers: [EventController],
            providers: [
                EventService,
                ...ProvideRepositories({
                    name: '9877fd06-2bd3-4698-bcc2-470144c19083',
                    url,
                    type,

                    entities: [EventEntity],
                    synchronize,
                    dropSchema,
                }),
                ...providers,
            ],
            exports: [EventService],
        };
    }
}
