import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth.module';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    const config = new DocumentBuilder().setTitle('Auth Service').addTag('Auth').build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, doc);
    const server = await app.listen(3000);
}
bootstrap();
