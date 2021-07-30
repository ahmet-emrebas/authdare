import { TaskEntity } from './entities/task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { resourceName } from '@authdare/utils/naming';
import { CreateTaskDTO, ReadTaskDTO, UpdateTaskDto } from './dto';


@Injectable()
export class TaskService {

  constructor(@InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>) { }

  async create(createTaskDTO: CreateTaskDTO) {
    return await this.taskRepo.save(this.taskRepo.create(createTaskDTO));
  }

  async find(query: FindManyOptions<TaskEntity>) {
    const data = (await this.taskRepo.find(query)).map(e => {
      return classToPlain(new ReadTaskDTO(e))
    });
    return {
      name: resourceName(TaskEntity),
      profile: "Undefined",
      count: data.length,
      data
    }
  }

  async findOne(id: number) {
    const found = await this.taskRepo.findOne(id);
    return plainToClass(CreateTaskDTO, found);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepo.update(id, updateTaskDto);
  }

  async softDelete(id: number) {
    return this.taskRepo.softDelete(id);
  }
}
