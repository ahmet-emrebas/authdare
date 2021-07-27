
import { ConnectionOptions } from 'typeorm';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { getModelsMap, getResourceService } from '../models';
import { UserEntity } from '@authdare/database';

@Injectable()
export class ResourceServiceInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

        const http = context.switchToHttp()
        const req = http.getRequest<Request & { user: UserEntity }>()
        const res = http.getResponse<Response>()
        const query = req.query;
        const body = req.body;
        const resource = req.params.resource;
        const method = req.method;
        const user = req.user;
        const models = await getModelsMap()

        const options: ConnectionOptions = {
            name: user.org.name,
            type: 'sqlite',
            database: `database/${user.org.name}/main.sqlite`,
            entities: Object.values(models).map(e => e.entity),
            synchronize: true,
            dropSchema: true,
        }
        const service = await getResourceService(options, resource);

        return await service.find({})
    }
}
