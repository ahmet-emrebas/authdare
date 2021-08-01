import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';

export interface ResourceModuleOptions<E, C, U, R, Q> {
  createDTO: C;
  updateDTO: U;
  readDTO: R;
  queryDTO: Q;
}

@Module({})
export class ResourceModule {
  static async register<E, C, U, R, Q>(
    options: ResourceModuleOptions<E, C, U, R, Q>,
  ): Promise<DynamicModule> {
    return {
      module: ResourceModule,
      imports: [],
    };
  }
}
