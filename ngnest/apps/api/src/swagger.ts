import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export type SwaggerConfigOptions = {
    app: INestApplication;
    title: string;
    description: string;
    path: string;
}

export function configureSwagger({ title, description, app, path }: SwaggerConfigOptions) {
    const config = new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .build();

    const apiDoc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, apiDoc);
}