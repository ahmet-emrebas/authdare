import { resourcePermissions } from '@base';
import { company, internet, name, phone } from 'faker';
import { CreateUserDto } from './dto';

/**
 * Create an instance of a CreateUserDto using faker random values
 * @returns { CreateUserDto } CreateUserDto
 */
export function userFakeData(): CreateUserDto {
  const pass = internet.password();
  return {
    orgname: company.companyName(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    middleName: name.lastName(),
    email: internet.email(),
    password: pass,
    passwordConfirmation: pass,
    permissions: resourcePermissions(),
    phone: phone.phoneNumber(),
  };
}
