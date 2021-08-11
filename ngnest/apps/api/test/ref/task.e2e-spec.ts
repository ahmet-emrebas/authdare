// import { yellow } from 'chalk';
// import * as supertest from 'supertest';
// import { expect } from 'chai';
// import { internet } from 'faker';
// import { random } from 'lodash';
// import { HttpStatus } from '@nestjs/common';

// const request = supertest(`http://localhost:3000/api/tasks/`);
// const signup = supertest('http://localhost:3000/auth/signup/');

// describe('Task Resource', () => {
//     let cookies: string[] = [];
//     const database = [
//         { title: 'A value 1', description: 'F value 1' },
//         { title: 'B value 2', description: 'G value 2' },
//         { title: 'C value 3', description: 'H value 3' },
//         { title: 'D value 4', description: 'I value 4' },
//         { title: 'E value 5', description: 'J value 5' },
//     ];

//     beforeAll(async () => {
//         const res = await signup.post('').send({
//             email: internet.email(),
//             password: 'mystrongpassword',
//             orgname: 'test' + random(80980),
//         });

//         cookies = res.get('Set-Cookie');

//         for (const p of database) {
//             await request.post('').set('Cookie', cookies).send(p);
//         }
//     });

//     // afterAll(async () => {
//     //     for (let id of range(0, 200)) {
//     //         await request.delete(`${id}`).set('Cookie', cookies).send();
//     //     }
//     // });

//     /**
//      * POST Method Testing
//      */
//     describe('POST /api/tasks', () => {
//         test.each`
//             body                                   | expected_keys                     | statusCode
//             ${database[0]}                         | ${['id', 'title', 'description']} | ${HttpStatus.CREATED}
//             ${{ title: '', description: '' }}      | ${['message']}                    | ${HttpStatus.NOT_ACCEPTABLE}
//             ${{ title: 'Only title' }}             | ${['message']}                    | ${HttpStatus.NOT_ACCEPTABLE}
//             ${{ description: 'Only Description' }} | ${['message']}                    | ${HttpStatus.NOT_ACCEPTABLE}
//             ${{}}                                  | ${['message']}                    | ${HttpStatus.NOT_ACCEPTABLE}
//             ${{ Unknwon_Field: '' }}               | ${['message']}                    | ${HttpStatus.NOT_ACCEPTABLE}
//         `(
//             `When I make a POST request with the BODY to /api/tasks, Then I should get the PROPERTIES.
//             \n\tbody:   ${yellow('$body')}
//             \n\tstatus: ${yellow('$statusCode')}
//             \n\tkeys :  ${yellow('$expected_keys')}\n\n`,
//             async ({ body, expected_keys, statusCode }) => {
//                 await request
//                     .post('')
//                     .set('Cookie', cookies)
//                     .send(body)
//                     .expect(statusCode)
//                     .expect((res) => {
//                         for (let k of expected_keys) {
//                             expect(res.body).haveOwnProperty(k);
//                         }
//                     });
//             },
//         );
//     });

//     /**
//      * GET Method Testing
//      */
//     describe('GET /api/tasks', () => {
//         test.each`
//             query                    | count   | fields                            | statusCode
//             ${''}                    | ${null} | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${'?take=1'}             | ${1}    | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${'?skip=1&take=1'}      | ${1}    | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${'?select=title'}       | ${null} | ${['title']}                      | ${HttpStatus.OK}
//             ${'?select=description'} | ${null} | ${['description']}                | ${HttpStatus.OK}
//             ${'?select=unknwon'}     | ${null} | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${'?title=A value 1'}    | ${1}    | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//         `(
//             `When I make a GET request to /api/tasks/${yellow(
//                 '$query',
//             )}, Then I should get the PROPERTIES.
//         \n\tcount: ${yellow('$count')}
//         \n\tfields: ${yellow('$fields')}
//         \n\tstatus: ${yellow('$statusCode')}\n\n`,
//             async ({ query, count, fields, statusCode }) => {
//                 await request
//                     .get(query)
//                     .set('Cookie', cookies)
//                     .send()
//                     .expect(statusCode)
//                     .expect(({ body }) => {
//                         if (count) expect(body.length).equal(count);
//                     });
//             },
//         );
//     });

//     /**
//      * Post Query
//      */
//     describe('POST /api/tasks/query', async () => {
//         test.each`
//             query                          | count   | fields                            | statusCode
//             ${{}}                          | ${null} | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${{ take: 1 }}                 | ${1}    | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${{ skip: 1, take: 1 }}        | ${1}    | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${{ select: ['title'] }}       | ${null} | ${['title']}                      | ${HttpStatus.OK}
//             ${{ select: ['description'] }} | ${null} | ${['description']}                | ${HttpStatus.OK}
//             ${{ select: ['unknwon'] }}     | ${null} | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//             ${{ title: 'A value 1' }}      | ${1}    | ${['id', 'title', 'description']} | ${HttpStatus.OK}
//         `(
//             `When I make a POST Query request to /api/tasks/query, Then I should get the PROPERTIES.
//         \n\tquery:${yellow('$query')}
//         \n\tcount: ${yellow('$count')}
//         \n\tfields: ${yellow('$fields')}
//         \n\tstatus: ${yellow('$statusCode')}\n\n`,
//             async ({ query, count, fields, statusCode }) => {
//                 await request
//                     .post('query')
//                     .set('Cookie', cookies)
//                     .send(query)
//                     .expect(statusCode)
//                     .expect(({ body }) => {
//                         if (count) expect(body.length).equal(count);
//                     });
//             },
//         );
//     });

//     // it('POST /api/tasks/query', async () => {
//     //     await request
//     //         .post('query')
//     //         .set('Cookie', cookies)
//     //         .send({
//     //             title: 'Valid value',
//     //             description: 'Valid value',
//     //         })
//     //         .expect(200)
//     //         .expect(({ body }: any) => {
//     //             expect(body[0].title, 'Valid value');
//     //             expect(body[0].description, 'Valid value');
//     //         });
//     // });

//     // it('GET /api/tasks/1', async () => {
//     //     await delay(1000);
//     //     const foundItem = await request.get('').set('Cookie', cookies).send();
//     //     const validID = foundItem.body[0].id;
//     //     assert.isNotEmpty(`${validID}`);
//     //     await request
//     //         .get(`${validID}`)
//     //         .set('Cookie', cookies)
//     //         .send()
//     //         .expect(200)
//     //         .expect((res) => {
//     //             expect(res.body.title).not.empty;
//     //             expect(res.body.description).not.empty;
//     //         });
//     // });
// });
