import { Module } from "@nestjs/common";
import { CommonModules } from "./app-common.module";

export const FREE_PROFILE = 'free';

@Module({
    imports: [
        ...CommonModules,
    ],
    controllers: [],
    providers: [],
})
export class FreeProfileModule { }
