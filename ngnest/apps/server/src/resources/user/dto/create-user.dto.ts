import { Exclude, Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import {
  ApiPropertyOptionsMore,
  BaseClass,
  IsEqualTo,
  resourcePermissions,
  TransformFromArrayToString,
} from '@base';
import { internet, name, phone } from 'faker';

/**
 * In this class every field should reflect the logical data types.
 * For example, array of string should be typed as array, NOT string.
 * An object should be typed as object, NOT string
 * Add the required tranformer decorator to prepare data for Entity Class.
 */

@Exclude()
export class CreateUserDto extends BaseClass<CreateUserDto> {
  @ApiPropertyOptionsMore({
    type: 'text',
    description: 'Organization Name',
    example: name.firstName(),
    required: true,
    unique: true,
    countPath: '/api/users/count',
    maxLength: 20,
    minLength: 2,
    groupName: 'Credentials',
    groupOrder: 1,
    maxLengthMsg: 'Organization Name must be at most 20 characters',
    minLengthMsg: 'Organziaiton Name must be at least 2 characters',
    isRequired: 'Organization Name is required!',
    autocomplete: 'organization',
  })
  @Expose()
  @Length(2, 20)
  orgname: string;

  @ApiPropertyOptionsMore({
    description: 'First Name',
    type: 'text',
    groupName: 'Credentials',
    groupOrder: 1,
    example: name.firstName(),
    required: true,
    maxLength: 20,
    minLength: 2,
    isRequired: 'First Name is required!',
    maxLengthMsg: 'First Name must be at most 20 characters',
    minLengthMsg: 'First Name must be at least 2 characters',
    autocomplete: 'given-name',
  })
  @Expose()
  @Length(2, 20)
  firstName: string;

  @ApiPropertyOptionsMore({
    type: 'text',
    required: true,
    description: 'Last Name',
    example: name.lastName(),
    maxLength: 20,
    minLength: 2,
    groupName: 'Credentials',
    groupOrder: 1,
    isRequired: 'Last Name is required!',
    maxLengthMsg: 'Last Name must be at most 20 characters',
    minLengthMsg: 'Last Name must be at least 2 characters',
    autocomplete: 'family-name',
  })
  @Expose()
  @Length(2, 20)
  lastName: string;

  @ApiPropertyOptionsMore({
    type: 'text',
    required: false,
    description: 'Middle Name',
    example: name.lastName(),
    maxLength: 20,
    groupName: 'Credentials',
    groupOrder: 1,
    autocomplete: 'off',
  })
  @Expose()
  middleName?: string;

  @ApiPropertyOptionsMore({
    type: 'tel',
    description: 'Phone',
    groupName: 'Connection',
    example: phone.phoneNumber(),
    unique: true,
    countPath: '/api/users/count',
    autocomplete: 'tel',
    required: true,
    groupOrder: 2,
    isRequired: 'Phone Number is required!',
    isPhone: 'Phone should be a valid phone number',
  })
  @Expose()
  phone: string;

  @ApiPropertyOptionsMore({
    type: 'email',
    description: 'Email',
    required: true,
    unique: true,
    countPath: '/api/users/count',
    example: internet.email(),
    groupName: 'Connection',
    groupOrder: 2,
    isRequired: 'Email is required',
    isEmail: 'Not a valid email',
    autocomplete: 'email',
  })
  @Expose()
  @IsEmail({}, { message: 'Not a valid email' })
  email: string;

  @ApiPropertyOptionsMore({
    type: 'password',
    id: 'new-password',
    required: true,
    description: 'Password',
    example: internet.password(),
    minLength: 6,
    maxLength: 20,
    groupName: 'Password',
    groupOrder: 3,
    autocomplete: 'new-password',
    isRequired: 'Password is required!',
    minLengthMsg: 'Password must be at least 6 characters',
    maxLengthMsg: 'Password must be at most 20 characters',
  })
  @Expose()
  @Length(6, 100)
  password: string;

  @ApiPropertyOptionsMore({
    type: 'password',
    description: 'Password Confirmation',
    groupName: 'Password',
    example: internet.password(),
    groupOrder: 3,
    required: true,
    minLength: 6,
    maxLength: 20,
    autocomplete: 'new-password',
    isRequired: 'Password Confirmation is required!',
    isEqualTo: 'password',
    isEqualToMsg: 'Passwords does not match!',
    dependent: ['password'],
  })
  @Expose()
  @Length(6, 100)
  @IsEqualTo('password')
  passwordConfirmation: string;

  @ApiPropertyOptionsMore({
    type: 'checkbox',
    description: 'Permissions',
    required: true,
    example: ['get:users', 'post:users'],
    groupName: 'Permissions',
    groupOrder: 4,
    autocomplete: 'permissions',
    autocompleteList: resourcePermissions(),
    isRequired: 'At least one permission is required!',
  })
  @TransformFromArrayToString()
  @Expose()
  permissions: string[];

  emailVerified?: boolean = false;
}
