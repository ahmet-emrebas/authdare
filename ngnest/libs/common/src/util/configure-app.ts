import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

// Application configureer
export type ApplicationConfigurerOptions = {
    module: any;
    docPath: string;
    adapter: any;
    title?: string;
    description?: string;
    middlewares?: any;
    microservice?: boolean;
};

/**
 * Configure application and swagger and return the instance
 * @param param0 ApplicationConfigurerOptions
 * @returns module instance that should be initialized before the server starts.
 */
export const configureApplication = async ({
    title,
    description,
    module,
    docPath,
    adapter,
    middlewares,
}: ApplicationConfigurerOptions) => {
    let appInstance: INestApplication = await NestFactory.create(module, adapter);

    if (middlewares && middlewares.length > 0) {
        appInstance.use(...middlewares);
    }
    const mainAppSwaggerConfig = new DocumentBuilder()
        .setTitle(title || 'Not Set')
        .setDescription(description || 'Not Set')
        .build();
    const mainAppDoc = SwaggerModule.createDocument(appInstance, mainAppSwaggerConfig);
    SwaggerModule.setup(docPath, appInstance, mainAppDoc);
    return appInstance;
};
