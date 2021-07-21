import { BaseEntity, readArrayTransformer } from '@base';
import { Column, Entity, Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

/**
 * Notes: The data comes to the entity class is already transformed,
 * Add the transformer for reading from database only, NOT writing.
 * Writing transformer is happening in CreateUserDto
 * If array field is needed, use comma seperated string with readArrayTransformer(),
 * readArrayTransformer transforms the data into array when reading.
 */
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({ length: 20 }) orgname: string;
  @Column({ length: 20 }) firstName: string;
  @Column({ length: 20 }) lastName: string;
  @Column({ length: 20, nullable: true }) middleName: string;
  @Column({ unique: true }) phone: string;
  @Column({ unique: true }) email: string;
  @Column({
    transformer: {
      to: (v) => hashSync(v, genSaltSync(12)),
      from: (v) => v,
    },
  })
  password: string;

  @Column({ transformer: readArrayTransformer(',') }) permissions: string;

  @Column({ nullable: true, default: false })
  emailVerified: boolean;
}
