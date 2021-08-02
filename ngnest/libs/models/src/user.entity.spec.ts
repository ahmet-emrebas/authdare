import { Groups } from './groups';
import { classToPlain, classToClass } from 'class-transformer';
import { HttpMethod } from '@authdare/http';
import { company, internet } from 'faker';
import { UserEntity, UserPermission } from './user.entity';
import { isNotEmpty, validate } from 'class-validator';
import { yellow } from 'chalk';
import { assert, expect } from 'chai';

const NUMBER_OF_RAW_FIELD_COUNT = 3;

const emptyString = ''.trim();

function fakeUser(): UserEntity {
  return new UserEntity({
    id: 1,
    email: internet.email(),
    password: internet.password(),
    orgname: company.companyName(),
    permissions: [new UserPermission(HttpMethod.get, 'users')]
  });
}

function invalidUser(field: keyof UserEntity, value: any) {
  const user = fakeUser() as any;
  user[field] = value;
  return user;
}

describe('UserEntity', () => {
  it('should be created', () => {
    const emptyInstance = new UserEntity();
    expect(emptyInstance).not.to.be.null
  });

  it('should have its own properties', () => {
    const user = fakeUser();
    assert.isNotNull(user.email);
    assert.isNotNull(user.password);
    assert.isNotNull(user.orgname);
    assert.isNotNull(user.permissions);
  });

  test.each`
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
        assert.equal(Object.keys(plainUser).length, fieldCount);
      }

      if (isNotEmpty(exposed))
        exposed?.forEach((field: string) => {
          expect(plainUser).to.have.property(field);
        });

      if (isNotEmpty(notExposed))
        notExposed?.forEach((field: any) => {
          expect(plainUser).not.have.property(field);
        });
    },
  );

  test.each`
    field         | invalidValue
    ${'email'}    | ${'invalidemail'}
    ${'password'} | ${'ip'}
    ${'orgname'}  | ${'o'}
  `(`should validate ${yellow('$field')}`, async ({ field, invalidValue }: any) => {
    const userInstance = classToClass(invalidUser(field, invalidValue), {
      groups: [Groups.SIGNUP],
    });
    const errors = await validate(userInstance);
    assert.equal(errors[0].property, field);
    assert.equal(errors.length, 1);
    assert.equal(Object.keys(userInstance).length, NUMBER_OF_RAW_FIELD_COUNT);
  });
});
