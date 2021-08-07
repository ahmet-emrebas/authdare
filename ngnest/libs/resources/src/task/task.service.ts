import { Logger } from '@nestjs/common';
import { UpdateTaskDTO } from './dto/update-tast.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskEntity } from '@authdare/resources/task';
import { BaseResourceService } from '@authdare/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TaskService extends BaseResourceService<TaskEntity, CreateTaskDTO, UpdateTaskDTO> {
    constructor(@InjectRepository(TaskEntity) __repo: Repository<TaskEntity>) {
        super(__repo, new Logger(TaskService.name));
    }
}
