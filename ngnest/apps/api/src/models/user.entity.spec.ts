import { Groups } from './groups';
import { classToPlain, classToClass } from 'class-transformer';
import { HttpMethod } from './../http/http-method';
import { company, internet } from 'faker';
import { UserEntity, UserPermission } from './user.entity';
import { isNotEmpty, validate } from 'class-validator';
import { yellow } from 'chalk';
import 'jest';

const NUMBER_OF_RAW_FIELD_COUNT = 3;

const emptyString = ''.trim();

function fakeUser(): UserEntity {
  return new UserEntity({
    id: 1,
    email: internet.email(),
    password: internet.password(),
    orgname: company.companyName(),
    permissions: [new UserPermission(HttpMethod.get, 'users')],
  });
}

function invalidUser(field: keyof UserEntity, value: any) {
  const user = fakeUser();
  user[field] = value;
  return user;
}

describe('UserEntity', () => {
  it('should be created', () => {
    const emptyInstance = new UserEntity();
    expect(emptyInstance).not.toBeNull();
  });

  it('should have its own properties', () => {
    const user = fakeUser();
    expect(user.email).not.toBeNull();
    expect(user.password).not.toBeNull();
    expect(user.orgname).not.toBeNull();
    expect(user.permissions).not.toBeNull();
  });

  it.each`
    groups                  | exposed                                      | fieldCount     | notExposed
    ${[Groups.AUTH_COOKIE]} | ${['id', 'orgname', 'email', 'permissions']} | ${4}           | ${emptyString}
    ${[Groups.READ]}        | ${emptyString}                               | ${emptyString} | ${['password']}
    ${[Groups.CREDENTIALS]} | ${['email', 'password']}                     | ${2}           | ${emptyString}
    ${[Groups.SIGNUP]}      | ${['email', 'orgname', 'password']}          | ${3}           | ${emptyString}
  `(
    `$groups groups should expose only any ${yellow('$fieldCount')} number of  properties ${yellow('$exposed')}, NOT expose the others ${(yellow('$notExposed'))}`,
    ({ groups, exposed, notExposed, fieldCount }: any) => {
      const user = fakeUser();
      const plainUser = classToPlain(user, { groups });

      if (isNotEmpty(fieldCount)) {
        expect(Object.keys(plainUser).length).toBe(fieldCount);
      }
      if (isNotEmpty(exposed))
        exposed?.forEach((field) => {
          expect(plainUser).toHaveProperty(field);
        });

      if (isNotEmpty(notExposed))
        notExposed?.forEach((field) => {
          expect(plainUser).not.toHaveProperty(field);
        });
    },
  );

  it.each`
    field         | invalidValue
    ${'email'}    | ${'invalidemail'}
    ${'password'} | ${'ip'}
    ${'orgname'}  | ${'o'}
  `(`should validate ${yellow('$field')}`, async ({ field, invalidValue }: any) => {
    const userInstance = classToClass(invalidUser(field, invalidValue), {
      groups: [Groups.SIGNUP],
    });
    const errors = await validate(userInstance);
    expect(errors[0].property).toBe(field);
    expect(errors.length == 1);
    expect(Object.keys(userInstance).length).toBe(NUMBER_OF_RAW_FIELD_COUNT);
  });
});
