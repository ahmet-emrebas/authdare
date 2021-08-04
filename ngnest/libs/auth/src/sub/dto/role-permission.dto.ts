import { BaseClass } from "@authdare/objects";
import { InitEach } from "@authdare/utils";
import { ApiProperty, } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class Permission extends BaseClass<Permission> {
    @Expose()
    @ApiProperty({ default: 'get' })
    readonly method!: string;

    @Expose()
    @ApiProperty({ default: 'users' })
    readonly resource!: string;
}



export class Role<Names extends string = string> extends BaseClass<Role<Names>> {
    @Expose()
    readonly name!: Names;
    @Expose({ name: 'permissions' })
    @InitEach(Permission)
    readonly permissions!: Permission[];
}



