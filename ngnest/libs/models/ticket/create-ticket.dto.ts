import { CreateProjectDto } from '../project/create-project.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@authdare/core';

@Exclude()
export class CreateTicketDto extends BaseDto<CreateTicketDto>{

}