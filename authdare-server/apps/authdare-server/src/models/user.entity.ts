import { Groups } from './groups';
import { hashPassword, toStringArray, Trim } from './transformers';
import { BaseEntity } from './base.entity';
import { Column, Entity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, Length, validate } from 'class-validator';
import { classToClass, Exclude, Expose, } from 'class-transformer';
import { UnprocessableEntityException } from '@nestjs/common';


export class UserPermission {
    @IsIn(['get', 'post', 'patch', 'delete', 'update', 'put']) method: string;
    @IsIn(['users', 'tasks']) resource: string;

    constructor(permissionOrMethod: string | UserPermission, resource?: string) {
        if (resource) {
            this.method = permissionOrMethod as string;
            this.resource = resource;
        } else {
            this.method = (permissionOrMethod as UserPermission).method;
            this.resource = (permissionOrMethod as UserPermission).resource;
        }
    }

    async validateAndTransformToClassInstance?(): Promise<UserPermission> | never {
        const permissionsClassInstance = classToClass(this);
        const errors = await validate(permissionsClassInstance);
        if (errors && errors.length > 0) {
            throw new UnprocessableEntityException(errors);
        }
        return permissionsClassInstance as unknown as UserPermission;
    }
}

@Entity({ name: 'users' })
@Exclude()
export class UserEntity extends BaseEntity<UserEntity> {

    @Expose({ groups: [Groups.READ, Groups.SIGNUP, Groups.AUTH_COOKIE] })
    @ApiProperty({ default: "aemrebas.dev@gmail.com" })
    @IsEmail()
    @Column({ unique: true })
    email?: string;

    @Expose({ groups: [Groups.PASSWORD, Groups.SIGNUP] })
    @ApiProperty({ default: "myPassword" })
    @IsOptional({ groups: [Groups.AUTH_COOKIE] })
    @Trim()
    @Length(6, 50)
    @Column({ transformer: hashPassword })
    password?: string;

    @Expose({ groups: [Groups.READ, Groups.AUTH_COOKIE] })
    @ApiProperty({ default: [{ method: '', resource: '' }] })
    @IsOptional({ groups: [Groups.SIGNUP] })
    @Trim()
    @Column({ type: 'text', transformer: toStringArray })
    permissions?: {
        method: string,
        resource: string
    }[];


    @Expose({ groups: [Groups.READ, Groups.SIGNUP, Groups.AUTH_COOKIE] })
    @ApiProperty({ default: "ahmet", })
    @Trim()
    @Length(3, 30,)
    @Column({ unique: true })
    orgname?: string;

}