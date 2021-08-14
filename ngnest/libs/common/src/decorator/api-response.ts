import { Get, Post, Patch, Delete, applyDecorators } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiInternalServerErrorResponse,
    ApiUnauthorizedResponse,
    ApiNotAcceptableResponse,
} from '@nestjs/swagger';

/**
 * @path ":query"
 * @returns
 */
export const QueryRoute = () =>
    applyDecorators(
        Get(':query'),
        ApiOkResponse(),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request',
        }),
        ApiInternalServerErrorResponse(),
    );

/**
 * @path ""
 * @returns
 */
export const FindRoute = () =>
    applyDecorators(
        Get(),
        ApiOkResponse(),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request',
        }),
        ApiInternalServerErrorResponse(),
    );

/**
 * @path ""
 * @returns
 */
export const SaveRoute = () =>
    applyDecorators(
        Post(),
        ApiCreatedResponse(),
        ApiConflictResponse({ description: 'Unique constraint' }),
        ApiNotAcceptableResponse({
            description: 'When input is not valid or required field is empty',
        }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request',
        }),
        ApiInternalServerErrorResponse(),
    );

/**
 * @path ":id"
 */
export const UpdateRoute = () =>
    applyDecorators(
        ApiCreatedResponse(),
        ApiConflictResponse({ description: 'Unique constraint' }),
        ApiNotAcceptableResponse({
            description: 'When the provided input is not valid or not found.',
        }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request',
        }),
        ApiInternalServerErrorResponse(),
        Patch(':id'),
    );

/**
 * @path ":id"
 * @returns
 */
export const DeleteRoute = () =>
    applyDecorators(
        Delete(':id'),
        ApiOkResponse(),
        ApiNotAcceptableResponse({
            description: 'When the provided input is not valid or not found.',
        }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request',
        }),
        ApiInternalServerErrorResponse(),
    );
