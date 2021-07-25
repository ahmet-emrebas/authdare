import { ResourceService, RESOURCE_SERVICE_TOKEN } from './resource.service';
import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ResourceController } from './resource.controller';

export type ResourceModuleOptions = {
    service: typeof ResourceService,
    controller: typeof ResourceController,
    /**
     * Determine the service will be accessable across the modules
     */
    isGlobal: boolean
}

@Module({})
export class ResourceModule {
    register({ isGlobal, service, controller }: Partial<ResourceModuleOptions>): DynamicModule {

        const serviceProvider: Provider = {
            provide: RESOURCE_SERVICE_TOKEN,
            useClass: service || ResourceService
        }

        const exports = isGlobal ? [serviceProvider] : [];

        return {
            module: ResourceModule,
            controllers: [controller || ResourceController],
            providers: [serviceProvider],
            exports

        }
    }
}