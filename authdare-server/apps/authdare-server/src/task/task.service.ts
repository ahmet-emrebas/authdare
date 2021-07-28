import { BaseResourceService } from '@authdare/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { TaskEntity } from './entity';

@Injectable()
export class TaskService extends BaseResourceService<TaskEntity, CreateTaskDTO, UpdateTaskDTO>{
    constructor(@InjectRepository(TaskEntity) task: Repository<TaskEntity>) {
        super(task, CreateTaskDTO, UpdateTaskDTO);
    }
}
