import { Module } from "@nestjs/common";
import { CommonModules } from "./app-common.module";

export const PUBLIC_PROFILE = 'public';

@Module({
    imports: [
        ...CommonModules,
    ],
    controllers: [],
    providers: [],
})
export class PublicProfileModule { }
