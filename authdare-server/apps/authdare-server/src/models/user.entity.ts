import { ResourceName } from './resource-name';
import { keys } from 'lodash';
import { Groups } from './groups';
import { hashPassword, Trim, FromStringToObject } from './transformers';
import { BaseEntity } from './base.entity';
import { Column, Entity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, Length, validate } from 'class-validator';
import { Exclude, Expose, classToClass, Transform } from 'class-transformer';
import { UnprocessableEntityException } from '@nestjs/common';
import { HttpMethod } from '../http';


export class UserPermission {
    @Expose()
    @IsIn(keys(HttpMethod))
    @Transform(({ value }) => {
        return (value as string).toLowerCase();
    })
    public method: HttpMethod = HttpMethod.get;

    @Expose()
    @IsIn(keys(ResourceName))
    @Transform(({ value }) => {
        return (value as string).toLowerCase();
    })
    public resource: string = 'unknown';

    constructor(method: HttpMethod, resource?: string) {
        this.method = method;
        this.resource = resource;
    }

    async validateAndTransformToClassInstance?(): Promise<UserPermission> | never {
        const transformed = classToClass(this);
        const errors = await validate(transformed);
        if (errors && errors.length > 0) {
            throw new UnprocessableEntityException(errors);
        }
        return transformed;
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

    @Expose({ groups: [Groups.READ, Groups.AUTH_COOKIE, Groups.SIGNUP] })
    @ApiProperty({ default: [{ method: '', resource: '' }] })
    @IsOptional({ groups: [Groups.SIGNUP, Groups.AUTH_COOKIE,] })
    @Column({
        type: 'text',
        nullable: true,
        transformer: FromStringToObject(['method', 'resource'])
    })
    permissions?: UserPermission[];


    @Expose({ groups: [Groups.READ, Groups.SIGNUP, Groups.AUTH_COOKIE] })
    @ApiProperty({ default: "ahmet", })
    @Trim()
    @Length(3, 30,)
    @Column({ unique: true })
    orgname?: string;

}