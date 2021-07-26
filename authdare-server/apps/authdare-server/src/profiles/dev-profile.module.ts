import { AuthUserResourceService } from './../../../../libs/auth/src/auth-user-resource.service';
import { AuthModule } from "@authdare/auth";
import { Module } from "@nestjs/common";
import { CommonModules } from "./app-common.module";
import { QueryOptions } from '@authdare/common';

export const DEV_PROFILE = 'dev';

@Module({
    imports: [
        ...CommonModules,
        AuthModule.register({
            userResouceService: class R implements AuthUserResourceService {
                find(queryOptions: QueryOptions<any>): Promise<any> {
                    throw new Error('Method not implemented.');
                }
                findOneById(id: number): Promise<any> {
                    throw new Error('Method not implemented.');
                }
                save(value: any): Promise<any> {
                    throw new Error('Method not implemented.');
                }
                update(id: number, value: any): Promise<any> {
                    throw new Error('Method not implemented.');
                }
                delete(id: number, hard?: boolean): Promise<any> {
                    throw new Error('Method not implemented.');
                }
            },
            imports: [

            ]
        })
    ],
    controllers: [],
    providers: [],
})
export class DevProfileModule { }
