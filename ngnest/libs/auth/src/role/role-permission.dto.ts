import { BaseClass } from "@authdare/objects";
import { InitEach, Trim } from "@authdare/utils";
import { ApiProperty, } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class Permission extends BaseClass<Permission> {

    @Expose()
    @ApiProperty({ default: 'get' })
    @Trim()
    readonly method!: string;

    @Expose()
    @ApiProperty({ default: 'users' })
    @Trim()
    readonly resource!: string;

}


export class Role<Names extends string = string> extends BaseClass<Role<Names>> {

    @Expose()
    readonly name!: Names;

    @Expose({ name: 'permissions' })
    @InitEach(Permission)
    readonly permissions!: Permission[];
}



