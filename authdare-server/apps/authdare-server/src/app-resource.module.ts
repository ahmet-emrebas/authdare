import { getResourceMap } from "@authdare/base";
import { DynamicModule, Module } from "@nestjs/common";
import { values } from "lodash";

@Module({})
export class AppResourceModule {
    static async register(): Promise<DynamicModule> {
        return {
            module: AppResourceModule,
            imports: values((await getResourceMap())).map(e => e.module)
        }
    }
}