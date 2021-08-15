import { CommonEntity } from '@authdare/common/class';
import { Column, Entity } from 'typeorm';
import { StringValidator } from '@authdare/common/decorator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'events' })
export class EventEntity extends CommonEntity<EventEntity> {
    @StringValidator()
    @Column()
    name?: string;

    @ApiProperty({})
    @Column({ nullable: true })
    payload?: string;
}
