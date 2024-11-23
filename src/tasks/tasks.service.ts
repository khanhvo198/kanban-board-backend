import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskPayLoad } from 'src/shared/models/task.interface';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(task: TaskPayLoad) {
    const newTask = await this.prismaService.task.create({
      data: {
        title: task.title,
        description: task.description,
        due: task.due,
        assignees: {
          createMany: {
            data: [...task.assignees],
          },
        },
        subTasks: {
          createMany: {
            data: [...task.subTasks],
          },
        },
        projectId: task.projectId,
      },
      include: {
        assignees: true,
        subTasks: true,
      },
    });

    return newTask;
  }
}
