import { Sprint } from '@authdare/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint])],
  controllers: [SprintController],
  providers: [SprintService],
  exports: [SprintService, TypeOrmModule],
})
export class SprintModule {}
