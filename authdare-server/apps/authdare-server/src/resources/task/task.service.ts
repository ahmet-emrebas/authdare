import { TaskEntity } from './entities/task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>) { }
  async create(createTaskDTO: CreateTaskDTO) {
    const created = await this.taskRepo.create(createTaskDTO);
    return this.taskRepo.save(created);
  }

  async find(query?: FindManyOptions<TaskEntity>) {
    return this.taskRepo.find(query);
  }

  async findOne(id: number) {
    return this.taskRepo.findOne(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepo.update(id, updateTaskDto);
  }

  async delete(id: number) {
    return this.taskRepo.delete(id);
  }
}
