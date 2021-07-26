import { genToken } from '@authdare/common';
import { ResourceService } from '@authdare/core';

export const AUTH_USER_RESOURCE_SERVICE_TOKEN = genToken();

export type AuthUserResourceService = ResourceService;
