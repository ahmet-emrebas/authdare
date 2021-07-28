import { Logger } from '@nestjs/common';
import { ORG_NAME } from './org-name';
import { getResourceService } from '@authdare/base';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as favicon from 'serve-favicon';
import { createRoleAndPermissions } from '@authdare/auth/create-role-permissions';
import { CreateOrgDTO, CreateUserDTO } from '@authdare/models';



async function initDatabase() {
  try {
    const adminRole = await createRoleAndPermissions();
    const userService = await getResourceService('users', ORG_NAME);
    const orgService = await getResourceService('orgs', ORG_NAME);

    const createdOrg = await orgService.create(new CreateOrgDTO({ name: ORG_NAME }))


    const createdAdminUser = await userService.create(new CreateUserDTO({
      email: "aemrebas.dev@gmail.com",
      password: 'password',
      active: true,
      org: { id: createdOrg.id },
      roles: [{ id: adminRole.id }]
    }));


  } catch (err) {
    throw new Error('Could not init the database!');
  }
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(cookieParser());
  app.use(favicon(join(__dirname, '..', '..', '..', 'client', 'favicon.ico')));

  const config = new DocumentBuilder()
    .setTitle('Authdare Api')
    .setDescription('Atomic role and permission assignment ... ')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // Initialize database
  setTimeout(async () => await initDatabase(), 3000)


  await app.listen(process.env['PORT'] || 3000);
}


bootstrap().then(() => {
  Logger.log('Initializing....')
}).catch(err => {
  Logger.error(err);
})






