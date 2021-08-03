import { BaseEntity } from '@authdare/models';
import { ResourceName } from '../resource-name';
import { keys } from 'lodash';
import { Groups } from '../groups';
import { hashPassword, Trim, JSONToString, LikeQuery } from '../transformers';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotIn, IsOptional, Length, validate } from 'class-validator';
import { Exclude, Expose, classToClass, Transform } from 'class-transformer';
import { UnprocessableEntityException } from '@nestjs/common';
import { HttpMethod } from '@authdare/http';


export class UserPermission {
  @Expose()
  @IsIn(keys(HttpMethod))
  @Transform(({ value }) => {
    return (value as string).toLowerCase();
  })
  public method: HttpMethod;

  @Expose()
  @IsIn(keys(ResourceName))
  @Transform(({ value }) => {
    return (value as string).toLowerCase();
  })
  public resource: string;

  constructor(method: HttpMethod, resource: string) {
    this.method = method;
    this.resource = resource;
  }

  async validateAndTransformToClassInstance():
    | Promise<UserPermission>
    | never {
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

  /**
   * Email
   */
  @Expose({
    groups: [
      Groups.CREATE,
      Groups.READ,
      Groups.SIGNUP,
      Groups.AUTH_COOKIE,
      Groups.CREDENTIALS,
      Groups.JOIN_TEAM,
      Groups.QUERY
    ],
  })
  @ApiProperty({ default: 'ahmet@gmail.com', })
  @IsEmail({}, { groups: [Groups.SIGNUP, Groups.CREATE, Groups.JOIN_TEAM] })
  @IsNotIn(
    ['aemrebas.dev@gmail.com', 'aemrebasus@gmail.com', 'aemrebas@gmail.com', 'authdare@authdare.com', , 'info@authdare.com'],
    { groups: [Groups.SIGNUP, Groups.CREATE, Groups.JOIN_TEAM] })
  @LikeQuery({ groups: [Groups.QUERY] })
  @Column({ unique: true })
  email?: string;


  /**
   * Password
   */
  @Expose({
    groups: [
      Groups.CREATE,
      Groups.PASSWORD,
      Groups.SIGNUP,
      Groups.CREDENTIALS,
      Groups.JOIN_TEAM
    ],
  })
  @ApiProperty({ default: 'myPassword' })
  @IsOptional({ groups: [Groups.AUTH_COOKIE] })
  @Trim()
  @Length(6, 50, { groups: [Groups.SIGNUP, Groups.CREATE, Groups.JOIN_TEAM] })
  @Column({ transformer: hashPassword })
  password?: string;


  /**
   * Permissions
   */
  @Expose({
    groups: [
      Groups.CREATE,
      Groups.READ,
      Groups.AUTH_COOKIE
    ]
  })
  @ApiProperty({ default: [{ method: '', resource: '' }] })
  @IsOptional({ groups: [Groups.SIGNUP, Groups.AUTH_COOKIE, Groups.JOIN_TEAM] })
  @Column({
    type: 'text',
    nullable: true,
    transformer: JSONToString(),
  })
  permissions?: UserPermission[];


  /**
   * Orgname 
   */
  @Expose({
    groups: [
      Groups.CREATE,
      Groups.READ,
      Groups.SIGNUP,
      Groups.AUTH_COOKIE,
      Groups.QUERY
    ]
  })
  @ApiProperty({ default: 'orgname' })
  @IsOptional({ groups: [Groups.JOIN_TEAM] })
  @IsNotIn(['authdare', 'ahmet', 'org', 'organization'], {
    groups: [
      Groups.SIGNUP,
      Groups.CREATE,
      Groups.JOIN_TEAM
    ]
  })
  @Trim()
  @LikeQuery({
    groups: [
      Groups.QUERY
    ]
  })
  @Length(3, 30, {
    groups: [
      Groups.SIGNUP,
      Groups.CREATE,
      Groups.JOIN_TEAM
    ]
  })
  @Column()
  orgname?: string;
}
