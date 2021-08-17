import { CommonEntity } from '@authdare/common/base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PasswordValidator, StringValidator } from '@authdare/common/validation';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SignupDetailsEntity } from './signup-details.entity';

@Entity({ name: 'subs' })
export class SignupEntity extends CommonEntity<SignupEntity> {
    @StringValidator({ max: 50 })
    @Column()
    orgname?: string;

    @ApiProperty()
    @IsEmail()
    @Column()
    email?: string;

    @PasswordValidator()
    @Column()
    password?: string;

    @ApiProperty()
    @IsPhoneNumber()
    @Column({ nullable: true })
    phone?: string;

    @ApiProperty()
    @Column({ nullable: true })
    address?: string;

    @OneToOne(() => SignupDetailsEntity, (d) => d)
    @JoinColumn()
    details?: SignupDetailsEntity;
}
