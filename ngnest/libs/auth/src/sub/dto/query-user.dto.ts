import { ValidationPipe } from '@nestjs/common';
import { Trim, TLikeContains } from '@authdare/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, NotContains } from 'class-validator';
import { BaseClass } from '@authdare/objects';

export const CreateAuthUserValidationPipe = new ValidationPipe({ transform: true });

/**
 * This DTO is for us to create a subscription manually.
 */
@Exclude()
export class QueryUserDTO extends BaseClass<QueryUserDTO> {
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

    @ApiProperty({ required: false, default: [{ name: 'rolename', permissions: [{ method: 'get', resource: 'users' }] }] })
    @Expose()
    readonly roles!: string[];
}
