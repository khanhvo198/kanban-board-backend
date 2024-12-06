import { Module } from '@nestjs/common';
import { ProjectService } from 'src/projects/projects.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ProjectService],
})
export class TasksModule {}
