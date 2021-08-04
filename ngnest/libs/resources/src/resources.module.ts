import { delay } from '@authdare/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { TaskEntity } from './task/entity/task.entity';
import { UserEntity } from './user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await delay(1000)
        return {
          name: 'resources',
          type: 'sqlite',
          database: 'database/initial/main.sqlite',
          entities: [UserEntity, TaskEntity],
          synchronize: true,
          dropSchema: true
        }
      }
    })
  ],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule { }
