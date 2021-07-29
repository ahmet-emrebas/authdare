
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
  private seeded = false;
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
    if (!this.seeded) {
      for (let _ of range(1, 40)) {
        await this.taskService.create(TaskModule.fakeTask())
      }
      this.seeded = true;
    }
  }

}
