import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateTaskRequest } from './dto/create-task.request';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body: CreateTaskRequest) {
    const { task } = body;
    const newTask = await this.tasksService.createTask(task);
    console.log(newTask);
    return newTask;
  }
}
