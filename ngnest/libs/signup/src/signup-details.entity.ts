import { CommonEntity } from '@authdare/common/base';
import { jsonTransformer } from '@authdare/common/util';
import { JSONValidator } from '@authdare/common/validation';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'sub_details' })
export class SignupDetailsEntity extends CommonEntity<SignupDetailsEntity> {
    @JSONValidator()
    @Column({ type: 'text', transformer: jsonTransformer() })
    details?: Record<string, any>;
}
