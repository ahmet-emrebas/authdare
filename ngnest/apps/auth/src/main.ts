import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { AuthModule } from './auth.module';
import { SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {

  const app = await NestFactory.create(AuthModule);
  const config = new DocumentBuilder()
    .setTitle('Swagger Title')
    .setDescription('Description of the api')
    .setVersion('1.0')
    .addTag('Tags')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
