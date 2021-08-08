import { UserEntity } from '@authdare/auth/user/entity/user.entity';
import { delay } from '@authdare/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskController, TaskEntity, TaskService } from './task';

@Module({
    controllers: [TaskController],
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                await delay(1000);
                return {
                    name: ResourcesModule.name,
                    // type: 'postgres',
                    type: 'sqlite',
                    // database: 'authdare',
                    database: 'database/resources/main.sqlite',
                    username: 'postgres',
                    password: 'password',
                    entities: [TaskEntity, UserEntity],
                    synchronize: true,
                    dropSchema: true,
                };
            },
        }),
        TypeOrmModule.forFeature([TaskEntity, UserEntity]),
    ],
    providers: [TaskService],
})
export class ResourcesModule {}
