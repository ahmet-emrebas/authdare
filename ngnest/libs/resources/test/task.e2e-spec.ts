import { CreateTaskDTO } from './../src/task/dto/create-task.dto';
import * as supertest from 'supertest';
import { assert, expect } from 'chai';
import { lorem } from 'faker';
import { range } from 'lodash';
import { delay } from '@authdare/utils';

const request = supertest(`http://localhost:3000/api/tasks/`);
const signup = supertest('http://localhost:3000/auth/signup');

describe('Task Resource', () => {
    let cookies: string[] = [];
    const validForm = new CreateTaskDTO({
        title: lorem.word(2),
        description: lorem.word(3),
    });

    const invalidForm = new CreateTaskDTO({
        description: '',
        title: '',
    });

    beforeAll(async () => {
        const res = await signup.post('').send({
            email: 'alskduf213asdf102@gmail.com',
            password: 'asklduruwierwer',
            orgname: 'asuiecmvopewi',
        });

        cookies = res.get('Set-Cookie');
    });

    afterAll(async () => {
        for (let id of range(0, 50)) {
            await request.delete(`${id}`).send();
        }

        assert.equal((await request.get('')).body.length, 0);
    });

    it('POST /api/tasks', async () => {
        await request
            .post('')
            .set('Cookie', cookies)
            .send(validForm)
            .expect(201)
            .expect((res) => {
                expect(res.body.title, validForm.title);
                expect(res.body.title, validForm.title);
                expect(res.body.description, validForm.description);
                expect(res.body.status, 'new');
            });
    });

    it('POST /api/tasks/query', async () => {
        await request
            .post('query')
            .set('Cookie', cookies)
            .send({
                title: validForm.title,
                description: validForm.description,
            })
            .expect(200)
            .expect((res) => {
                expect(res.body[0].title, validForm.title);
                expect(res.body[0].description, validForm.description);
            });
    });

    it('GET /api/tasks', async () => {
        await request
            .get('')
            .set('Cookie', cookies)
            .send()
            .expect(200)
            .expect((res) => {
                assert.isAtLeast(res.body.length, 1);
                expect(res.body[0].title, validForm.title);
                expect(res.body[0].description, validForm.description);
            });
    });

    it('GET /api/tasks/1', async () => {
        await delay(1000);
        const foundItem = await request.get('').set('Cookie', cookies).send();
        const validID = foundItem.body[0].id;
        assert.isNotEmpty(`${validID}`);
        await request
            .get(`${validID}`)
            .set('Cookie', cookies)
            .send()
            .expect(200)
            .expect((res) => {
                assert.isNotEmpty(res.body.title);
                assert.isNotEmpty(res.body.description);
            });
    });

    it(`PATCH /api/tasks`, async () => {
        await request
            .patch('1')
            .set('Cookie', cookies)
            .send({ title: 'new title' })
            .expect(201)
            .expect((res) => {
                assert.notProperty(res.body, 'title');
                assert.notProperty(res.body, 'description');
            });
    });
});
