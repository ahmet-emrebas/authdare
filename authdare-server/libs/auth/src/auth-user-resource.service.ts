import { genToken } from '@authdare/common';
import { ResourceService } from '@authdare/core';
import { CreateUserDto, UpdateUserDto, User } from '@authdare/models';

export const AUTH_USER_RESOURCE_SERVICE_TOKEN = genToken();

export type AuthUserResourceService = ResourceService<User, CreateUserDto, UpdateUserDto>;
