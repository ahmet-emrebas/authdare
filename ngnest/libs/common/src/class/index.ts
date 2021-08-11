import { IsOptional, IsString, MinLength } from 'class-validator';
import { cloneDeep } from 'lodash';
import { t } from '../type';

export class CommonConstructor<T> {
    constructor(obj?: T) {
        if (obj) Object.assign(obj, cloneDeep(obj));
    }
}

export class SwaggerOptions extends CommonConstructor<SwaggerOptions> {
    @IsString()
    @MinLength(3)
    title = t<string>();

    @IsString()
    @MinLength(3)
    description = t<string>();
}
