import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { configureSwagger } from './configure-swagger';

export async function initSubApps(adaptor: ExpressAdapter, ...modules: any[]) {
    for (const module of modules) {
        const appInstance = await NestFactory.create(module, adaptor);

        configureSwagger({
            app: appInstance,
            description: module.description,
            title: module.title,
            path: module.path,
        });

        // const config = appInstance.get(ConfigService);

        appInstance.init();
    }
}
