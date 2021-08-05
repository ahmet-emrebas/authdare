import { CreateAuthUserDTO } from './../src/sub/dto/create-auth-user.dto';
import { AuthPaths } from './../src/auth-paths';
import { AuthModule } from '../src/auth.module'
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AuthModule (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/signup (POST)', () => {
        return request(app.getHttpServer())
            .post("/" + AuthPaths.BASE + "/" + AuthPaths.SIGNUP)
            .send({
                email: 'aemrebas.dev@gmail.com',
                password: 'mystrongpass',
                orgname: 'aemrebas',
            } as CreateAuthUserDTO)
            .expect(200)
            .expect('Hello World!');
    });
});
