import { SetMetadata } from '@nestjs/common';
import { t } from '@authdare/common/type';
import {
    IsBoolean,
    IsString,
    ValidateNested,
    Length,
    Matches,
    MinLength,
    IsArray,
    ArrayMaxSize,
    IsOptional,
    validate,
    validateSync,
} from 'class-validator';
import { isLength } from 'lodash';
import { CommonConstructor } from '../class';
export const HandlerOptionsToken = 'HandlerOptions';
import * as joi from 'joi';
/// users:get,patch,delete,

class HandlerOptions extends CommonConstructor<HandlerOptions> {
    @IsBoolean()
    email? = t<boolean>();

    @IsArray()
    @ValidateNested({ each: true })
    @IsString()
    @Length(3, 20)
    events? = t<string[]>();

    @IsBoolean()
    uniques? = t<string[]>();

    @IsArray()
    @ValidateNested({ each: true })
    @IsString()
    @Matches(new RegExp(``))
    permissions? = t<string>();

    @IsBoolean()
    public? = t<boolean>();

    private static validate(options: HandlerOptions) {
        const errors = validateSync(options, { skipMissingProperties: true });
        if (errors.length > 0) {
            throw new Error('Malformed handler options');
        }
    }
}

const permissionEx = (fields: string[]) =>
    new RegExp(
        `^( ){0,}[a-z][a-z]{2,10}s(( ){1,}--->( ){1,}(( ){1,}(get|patch|put|post|delete)){1,}(( ){1,}>(( ){1,}(${fields.join(
            '|',
        )})){1,}){0,1}){1,}( ){0,}$`,
    );

const HandlerOptionValidator = (fields: string[]) =>
    joi.object({
        email: joi.boolean(),
        events: joi.array().items(joi.string()),
        uniques: joi.array().items(joi.string()),
        permissions: joi.string().pattern(permissionEx(fields)),
        public: joi.boolean(),

        // uniques
        // permissions
        // public
    });

export function SetHandlerOptions(options: HandlerOptions) {
    return SetMetadata(HandlerOptionsToken, options);
}
