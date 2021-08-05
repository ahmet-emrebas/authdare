import { TaskController } from './task/task.controller';
import { delay } from '@authdare/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { TaskEntity } from './task/entity/task.entity';

@Module({
  controllers: [TaskController],
  imports: [

    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await delay(1000)
        return {
          name: ResourcesModule.name,
          type: 'sqlite',
          database: 'database/initial/main.sqlite',
          entities: [TaskEntity],
          synchronize: true,
          dropSchema: true
        }
      }
    }),
    TypeOrmModule.forFeature([TaskEntity])
  ],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule { }
