import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { JWTModuleOptions } from "@authdare/auth";
import { OrgEntity, RoleEntity } from "@authdare/models";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [RoleController],
    imports: [
        JwtModule.registerAsync(JWTModuleOptions()),
        TypeOrmModule.forFeature([RoleEntity, OrgEntity])
    ],
    providers: [RoleService]
})
export class RoleModule {
    static readonly className = 'RoleModule';
}