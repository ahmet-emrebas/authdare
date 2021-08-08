import { snakeCase } from 'lodash';
import * as supertest from 'supertest';
import { assert } from 'chai';
import { internet, company } from 'faker';
import { AuthRoutes } from '../../../libs/auth/src/auth-routes';
import { LoginDTO } from '../../../libs/auth/src/user/dto/login.dto';
import { SignupDTO } from '../../../libs/auth/src/user/dto/signup.dto';

const request = supertest(`http://localhost:3000/${AuthRoutes.BASE}/`);

describe('Auth Module', () => {
    let cookies: string[] = [];
    const validSignupForm = new SignupDTO({
        email: internet.email(),
        password: internet.password(),
        orgname: company.companyName(),
    });

    const validLoginForm = new LoginDTO({
        email: validSignupForm.email,
        password: validSignupForm.password,
    });

    const signupResponseBody = { message: 'Welcome!' };
    describe('Sign up', () => {
        it('POST /auth/signup', async () => {
            const res = await request
                .post(AuthRoutes.SIGNUP)
                .send(validSignupForm);
            assert.equal(res.status, 201);
            assert.deepEqual(res.body, signupResponseBody);
        });

        it('POST /auth/login', async () => {
            const res = await request
                .post(AuthRoutes.LOGIN)
                .send(validLoginForm);

            cookies = res.get('Set-Cookie');
            assert.equal(res.status, 201);
            assert.isNotNull(res.body.message);
        });

        it('GET /auth/profile', async () => {
            const res = await request
                .get(AuthRoutes.PROFILE)
                .set('Cookie', cookies)
                .send();
            assert.equal(res.body.email, validSignupForm.email);
            assert.equal(res.body.orgname, snakeCase(validSignupForm.orgname));
            assert.notEqual(res.body.password, validSignupForm.password);
        });

        it(`PATCH /auth/update-profile`, async () => {
            const updatedPassword = 'asdfasdfasdf';
            const res = await request
                .patch(AuthRoutes.UPDATE_PROFILE)
                .set('Cookie', cookies)
                .send({ password: updatedPassword });

            assert.equal(res.status, 200);
            assert.isNotEmpty(res.body.message);
        });
    });
});
