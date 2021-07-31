import { Groups } from './groups';
import { hashPassword, toStringArray, Trim } from './utils';
import { BaseEntity } from './base.entity';
import { Column, Entity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Exclude, Expose, } from 'class-transformer';
import { adminPermissions } from '../utils';

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
    @ApiProperty({ default: adminPermissions('ahmet') })
    @IsOptional({ groups: [Groups.SIGNUP] })
    @Trim()
    @IsString({ each: true })
    @Column({ type: 'text', transformer: toStringArray })
    permissions?: string[];


    @Expose({ groups: [Groups.READ, Groups.SIGNUP, Groups.AUTH_COOKIE] })
    @ApiProperty({ default: "ahmet", })
    @Trim()
    @Length(3, 30,)
    @Column({ unique: true })
    orgname?: string;

}