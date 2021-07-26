import { Module } from "@nestjs/common";
import { CommonModules } from "./app-common.module";

export const DEV_PROFILE = 'dev';

@Module({
    imports: [
        ...CommonModules,
    ],
    controllers: [],
    providers: [],
})
export class DevProfileModule { }
