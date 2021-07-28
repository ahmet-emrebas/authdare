import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { JWTModuleOptions } from "@authdare/auth";
import { OrgEntity, PermissionEntity } from "@authdare/models";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [PermissionController],
    imports: [
        JwtModule.registerAsync(JWTModuleOptions()),
        TypeOrmModule.forFeature([PermissionEntity, OrgEntity])
    ],
    providers: [PermissionService]
})
export class PermissionModule {
    static readonly className = 'PermissionModule';
}