import { Groups } from './groups';
import { hashPassword, toStringArray, Trim } from './utils';
import { BaseEntity } from './base.entity';
import { Column, Entity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { internet } from 'faker';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Exclude, Expose, } from 'class-transformer';

@Entity({ name: 'users' })
@Exclude()
export class UserEntity extends BaseEntity<UserEntity> {

    @Expose()
    @ApiProperty({ default: internet.email() })
    @IsEmail()
    @Column({ unique: true })
    email?: string;

    @Expose({ groups: [Groups.PASSWORD] })
    @ApiProperty({ default: internet.password() })
    @Trim()
    @Length(6, 50)
    @Column({ transformer: hashPassword })
    password?: string;

    @Expose()
    @ApiProperty({ default: ['orgname:method:resource'] })
    @Trim()
    @IsString({ each: true })
    @IsOptional({ groups: [Groups.SIGNUP] })
    @Column({ type: 'text', transformer: toStringArray })
    permissions?: string[];


    @Expose()
    @ApiProperty({
        type: 'string',
        default: "ahmet",
    })
    @Trim()
    @Length(3, 30,)
    @Column({ unique: true })
    orgname?: string;

}