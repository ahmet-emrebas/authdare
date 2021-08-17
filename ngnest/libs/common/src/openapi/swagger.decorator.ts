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
        ApiOkResponse({ description: 'When queried' }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request',
        }),
        ApiInternalServerErrorResponse({ description: 'When server side error occured.' }),
    );

/**
 * @path ""
 * @returns
 */
export const FindRoute = () =>
    applyDecorators(
        Get(),
        ApiOkResponse({ description: 'When got.' }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request',
        }),
        ApiInternalServerErrorResponse({ description: 'When server side error occured.' }),
    );

/**
 * @path ""
 * @returns
 */
export const SaveRoute = () =>
    applyDecorators(
        Post(),
        ApiCreatedResponse({ description: 'When created.' }),
        ApiConflictResponse({ description: 'Unique constraint' }),
        ApiNotAcceptableResponse({
            description: 'When input is not valid or required field is empty',
        }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request.',
        }),
        ApiInternalServerErrorResponse({ description: 'When server side error occured.' }),
    );

/**
 * @path ":id"
 */
export const UpdateRoute = () =>
    applyDecorators(
        Patch(':id'),
        ApiCreatedResponse({
            description: 'When updated.',
        }),
        ApiConflictResponse({ description: 'Unique constraint.' }),
        ApiNotAcceptableResponse({
            description: 'When the provided input is not valid or not found.',
        }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request.',
        }),
        ApiInternalServerErrorResponse({ description: 'When server side error occured.' }),
    );

/**
 * @path ":id"
 * @returns
 */
export const DeleteRoute = () =>
    applyDecorators(
        Delete(':id'),
        ApiOkResponse({
            description: 'When deleted.',
        }),
        ApiNotAcceptableResponse({
            description: 'When the provided input is not valid or not found.',
        }),
        ApiUnauthorizedResponse({
            description: 'When user does not have a valid session for this request.',
        }),
        ApiInternalServerErrorResponse({ description: 'When server side error occured.' }),
    );
