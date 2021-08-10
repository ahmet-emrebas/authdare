import { cloneDeep } from 'lodash';
import { ValidationPipe } from '@nestjs/common';
import { Trim, TLikeContains } from '@authdare/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, NotContains } from 'class-validator';
import { QueryDTO } from '@authdare/objects';
import { UserEntity } from './../entity';

export const QueryUserValidationPipe = new ValidationPipe({ transform: true });

/**
 * This DTO is for us to create a subscription manually.
 */
@Exclude()
export class QueryUserDTO {
    @ApiProperty({ type: 'string', required: true, default: 'email@gmail.com' })
    @Expose()
    @TLikeContains()
    @NotContains(' ')
    readonly email!: string;

    @ApiProperty({ type: 'string', required: true, default: 'orgname' })
    @Expose()
    @Trim()
    @TLikeContains()
    @Length(3, 50)
    readonly orgname!: string;

    @ApiProperty({ required: false, default: 'get:users,post:users' })
    @Expose()
    readonly permissions!: string;

    constructor(obj: QueryUserDTO) {
        Object.assign(this, cloneDeep(obj));
    }
}

export class FindManyUsersOptions extends QueryDTO<UserEntity> {}
