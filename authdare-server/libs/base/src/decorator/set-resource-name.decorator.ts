import { SetMetadata } from "@nestjs/common";

export const SET_RESOURCE_NAME = 'SET_RESOURCE_NAME';

export const SetResourceName = (resourceName: string) => SetMetadata(SET_RESOURCE_NAME, resourceName)