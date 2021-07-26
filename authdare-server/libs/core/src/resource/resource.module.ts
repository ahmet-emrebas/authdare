import { ResourceService, RESOURCE_SERVICE_TOKEN } from './resource.service';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ResourceController } from './resource.controller';

export type ResourceModuleOptions = {
  service: typeof ResourceService;
  controller: typeof ResourceController;
  /**
   * Determine the service will be accessable across the modules
   */
  isGlobal: boolean;
};

@Module({})
export class ResourceModule {
  /**
   * ResouceController has an implementation so you can either extend the ResourceService or implement a new one. ResourceService does not have an implementation so you must implement ResouceService
   * @param param0
   * @returns
   */
  register({
    isGlobal,
    service,
    controller,
  }: ResourceModuleOptions): DynamicModule {
    const serviceProvider: Provider = {
      provide: RESOURCE_SERVICE_TOKEN,
      useClass: service || ResourceService,
    };

    const exports = isGlobal ? [serviceProvider] : [];

    return {
      module: ResourceModule,
      controllers: [controller || ResourceController],
      providers: [serviceProvider],
      exports,
    };
  }
}
