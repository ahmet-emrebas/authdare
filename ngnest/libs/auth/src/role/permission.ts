import { IPermission } from "@authdare/interfaces";
import { BaseClass } from "@authdare/objects";
import { Trim } from "@authdare/utils";
import { ApiProperty, } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";


/**
 * The same role can have different permissions
 */
@Exclude()
export class Permission extends BaseClass<Permission> implements IPermission {

    @ApiProperty({ default: 'get' })
    @Expose()
    @Trim()
    readonly method!: string;

    @Expose()
    @ApiProperty({ default: 'users' })
    @Trim()
    readonly resource!: string;
}




