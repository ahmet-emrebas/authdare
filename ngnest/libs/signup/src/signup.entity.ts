import { CommonEntity } from '@authdare/common/class';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { JSONValidator, PasswordValidator, StringValidator } from '@authdare/common/decorator';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { jsonTransformer } from '@authdare/common/util';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SubscriptionDetails extends CommonEntity<SubscriptionDetails> {
    @JSONValidator()
    @Column({ type: 'text', transformer: jsonTransformer() })
    details?: Record<string, any>;
}

@Entity({ name: 'signups' })
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

    @OneToOne(() => SubscriptionDetails, (d) => d)
    @JoinColumn()
    details?: SubscriptionDetails;
}
