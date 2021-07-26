import { Module } from "@nestjs/common";
import { CommonModules } from "./app-common.module";


export const COMMUNITY_PROFILE = 'community';

@Module({
    imports: [
        ...CommonModules,
    ],
    controllers: [],
    providers: [],
})
export class CommunityProfileModule { }
