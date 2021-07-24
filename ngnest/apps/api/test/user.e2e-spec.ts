import * as supertest from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { fakeOrg, fakeUser, fakePhoto, fakeRole, TestResouceService } from './helpers';


const userData = fakeUser();
const orgData = fakeOrg();
const photoData = fakePhoto();
const roleData = fakeRole();


describe('User Controller', () => {

    const apiPath = (p: string) =>
    // const organizations = new TestResouceService(apiPath('organizations'));
    // const users = new TestResouceService(apiPath('users'));
    // const profiles = new TestResouceService(apiPath('profiles'));
    // const photos = new TestResouceService(apiPath('photos'));
    // const roles = new TestResouceService(apiPath('roles'));
    // const permissions = new TestResouceService(apiPath('permissions'));


    // it('Should create user with valid data or return related error message.', async () => {
    //     const response = await users.create(userData);
    //     expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    //     expect(response.body.message).toBe('Organization is not found!')
    // });

    // it('Should create the user with VALID Organization ID', async () => {
    //     // const responseOrg = await organizations.post('').send(orgData);
    //     // const responseUser = await users.post('').send({ ...userData, organization: { id: responseOrg.body.id } })
    //     // expect(responseUser.status).toEqual(HttpStatus.CREATED);
    //     // expect(responseUser.body.organization.id).toEqual(responseOrg.body.id);
    // })

    // it('Should patch the user role', async () => {

    // })


});
