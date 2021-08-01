import { Groups } from './groups';
import { classToPlain, classToClass } from 'class-transformer';
import { HttpMethod } from './../http/http-method';
import { company, internet } from 'faker';
import { UserEntity, UserPermission } from './user.entity';
import { validate } from 'class-validator';



const NUMBER_OF_RAW_FIELD_COUNT = 3;


function fakeUser() {
    return new UserEntity({
        id: 1,
        email: internet.email(),
        password: internet.password(),
        orgname: company.companyName(),
        permissions: [new UserPermission(HttpMethod.get, 'users')]
    })
}


function invalidUser(field: string, value: any) {
    const user = fakeUser();
    user[field] = value;
    return user;
}


describe('UserEntity', () => {

    it('should be created', () => {
        const emptyInstance = new UserEntity();
        expect(emptyInstance).not.toBeNull();
    })


    it('should have its own properties', () => {
        const user = fakeUser();
        expect(user.email).not.toBeNull();
        expect(user.password).not.toBeNull();
        expect(user.orgname).not.toBeNull();
        expect(user.permissions).not.toBeNull();
    })

    it('Groups.READ should not expose password', () => {
        const user = fakeUser();
        const plainUser = classToPlain(user, { groups: [Groups.READ] });
        expect(user.password).not.toBeNull();
        expect(plainUser).not.toHaveProperty('password');
    })


    it('Groups.AUTH_COOKIE should Have id, permissions, email, orgname properties', () => {
        const user = fakeUser();
        const plainUser = classToPlain(user, { groups: [Groups.AUTH_COOKIE] })
        expect(plainUser).toHaveProperty('id');
        expect(plainUser).toHaveProperty('orgname');
        expect(plainUser).toHaveProperty('email');
        expect(plainUser).toHaveProperty('permissions');
    })

    it('Groups.AUTH_COOKIE should NOT Have password, id, created_at, updated_at, deleted_at property', () => {
        const user = fakeUser();
        const plainUser = classToPlain(user, { groups: [Groups.AUTH_COOKIE] })
        expect(plainUser).not.toHaveProperty('created_at');
        expect(plainUser).not.toHaveProperty('updated_at');
        expect(plainUser).not.toHaveProperty('deleted_at');
    })


    it('Groups.CREDENTIALS should expose only email and password', () => {
        const user = fakeUser();
        const plainUser = classToPlain(user, { groups: [Groups.CREDENTIALS] })
        expect(plainUser).toHaveProperty('email');
        expect(plainUser).toHaveProperty('password');
        expect(Object.keys(plainUser).length).toBe(2);
    })


    it('Groups.SIGNUP should expose only email, password, orgname', () => {
        const user = fakeUser();
        const plainUser = classToPlain(user, { groups: [Groups.SIGNUP] })
        expect(plainUser).toHaveProperty('email');
        expect(plainUser).toHaveProperty('password');
        expect(plainUser).toHaveProperty('orgname');
        expect(Object.keys(plainUser).length).toBe(3);
    })

    it.each`
        field   | invalidValue
        ${"email"} | ${"invalidemail"}
        ${"password"} | ${"ip"}
        ${"orgname"} |${"o"}
    `('should validate $field', async ({ field, invalidValue }: any) => {
        let userInstance = classToClass(invalidUser(field, invalidValue), { groups: [Groups.SIGNUP] });
        let errors = await validate(userInstance);
        expect(errors[0].property).toBe(field);
        expect(errors.length == 1);
        expect(Object.keys(userInstance).length).toBe(NUMBER_OF_RAW_FIELD_COUNT);

    })

    // it('should validate email, orgname, password, ', async () => {

    // let userInstance = classToClass(invalidUser('email', 'invalidemail'), { groups: [Groups.SIGNUP] });
    // let errors = await validate(userInstance);
    // expect(errors[0].property).toBe('email');
    // expect(errors.length == 1);
    // expect(Object.keys(userInstance).length).toBe(NUMBER_OF_RAW_FIELD_COUNT);

    // userInstance = classToClass(invalidUser('password', '123'), { groups: [Groups.SIGNUP] });
    // errors = await validate(userInstance);
    // expect(errors[0].property).toBe('password');
    // expect(errors.length == 1);
    // expect(Object.keys(userInstance).length).toBe(NUMBER_OF_RAW_FIELD_COUNT);

    // userInstance = classToClass(invalidUser('orgname', 'o'), { groups: [Groups.SIGNUP] });
    // errors = await validate(userInstance);
    // expect(errors[0].property).toBe('orgname');
    // expect(errors.length == 1);
    // expect(Object.keys(userInstance).length).toBe(NUMBER_OF_RAW_FIELD_COUNT);

    // })

});