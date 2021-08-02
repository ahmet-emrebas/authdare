import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Trim } from './transformers';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity<TaskEntity> {
  @ApiProperty()
  @Trim()
  @Length(3, 300)
  @Column()
  title?: string;

  @ApiProperty()
  @Trim()
  @Length(3, 300)
  @Column({ nullable: true })
  description?: string;
}
