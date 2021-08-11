// import { snakeCase } from 'lodash';
// import * as supertest from 'supertest';
// import { assert } from 'chai';
// import { internet, company } from 'faker';
// import { LoginDTO } from '../../../libs/auth/src/user/dto/login.dto';
// import { SignupDTO } from '../../../libs/auth/src/user/dto/signup.dto';

// const request = supertest(`http://localhost:3000/auth`);

// describe('Auth Module', () => {
//     let cookies: string[] = [];
//     const validSignupForm = new SignupDTO({
//         email: internet.email(),
//         password: internet.password(),
//         orgname: company.companyName(),
//     });

//     const validLoginForm = new LoginDTO({
//         email: validSignupForm.email,
//         password: validSignupForm.password,
//     });

//     describe('Sign up', () => {
//         it('POST /auth/signup', async () => {
//             await request
//                 .post('/signup')
//                 .send(validSignupForm)
//                 .expect(201)
//                 .expect((res) => {
//                     const cookies = res.get('Set-Cookie');
//                     assert.isNotNull(cookies);
//                     assert.isNotEmpty(res.body.message);
//                 });
//         });
//     });

//     describe('Login', () => {
//         it('POST /auth/login', async () => {
//             const res = await request.post('/login').send(validLoginForm);
//             cookies = res.get('Set-Cookie');

//             assert.isNotNull(cookies);
//             assert.equal(res.status, 200);
//             assert.isNotNull(res.body.message);
//         });
//     });

//     describe('Profile', () => {
//         it('GET /auth/profile', async () => {
//             const res = await request
//                 .get('/profile')
//                 .set('Cookie', cookies)
//                 .send()
//                 .expect(200);

//             assert.equal(res.body.email, validSignupForm.email);
//             assert.equal(res.body.orgname, snakeCase(validSignupForm.orgname));
//             assert.notEqual(res.body.password, validSignupForm.password);
//         });
//     });
// });
