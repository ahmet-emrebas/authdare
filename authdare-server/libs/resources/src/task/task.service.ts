import { QueryTaskDTO } from './dto/query-task.dto';
import { TaskEntity } from './entities/task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { resourceName } from '@authdare/utils/naming';
import { CreateTaskDTO, ReadTaskDTO, UpdateTaskDto } from './dto';
import { FindManyResponse, ResourceService } from '@authdare/base/controller';


@Injectable()
export class TaskService implements ResourceService<QueryTaskDTO, ReadTaskDTO, CreateTaskDTO, UpdateTaskDto> {

  constructor(@InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>) { }

  async create(createTaskDTO: CreateTaskDTO): Promise<ReadTaskDTO> {
    const saved = await this.taskRepo.save(this.taskRepo.create(createTaskDTO));
    return classToPlain(new ReadTaskDTO(saved));
  }

  async find(query: FindManyOptions<TaskEntity>): Promise<FindManyResponse<ReadTaskDTO>> {
    const data = (await this.taskRepo.find(query)).map(e => classToPlain(new ReadTaskDTO(e), { exposeUnsetFields: true })) as ReadTaskDTO[];
    return {
      name: resourceName(TaskEntity),
      profile: "Undefined",
      count: data.length,
      data
    }
  }

  async findOne(id: number) {
    const found = await this.taskRepo.findOne(id);
    return classToPlain(new CreateTaskDTO(found));
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepo.update(id, updateTaskDto);
  }

  async softDelete(id: number) {
    return this.taskRepo.softDelete(id);
  }
}
