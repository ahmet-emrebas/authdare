
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { range } from 'lodash';
import { lorem } from 'faker'
import { TaskEntity } from './entities';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule implements NestModule {
  constructor(private taskService: TaskService) { }

  async configure(consumer: MiddlewareConsumer) {
    await this.seedDatabase();
  }

  private static fakeTask(): CreateTaskDTO {
    return {
      title: lorem.words(2),
      description: lorem.words(10)
    }
  }

  private async seedDatabase() {

    for (let _ of range(1, 11)) await this.taskService.create(TaskModule.fakeTask())
    setTimeout(async () => {
      for (let _ of range(1, 11)) await this.taskService.create(TaskModule.fakeTask())
    }, 3000)

  }

}
