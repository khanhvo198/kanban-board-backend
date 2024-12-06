import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/projects/projects.service';
import { TaskPayload } from 'src/shared/models/task.interface';

@Injectable()
@UseGuards(JwtAuthGuard)
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectService: ProjectService,
  ) {}

  async createTask(task: TaskPayload) {
    const projectTags = await this.prismaService.tag.findMany({
      where: {
        projectId: task.projectId,
      },
    });

    const newTask = await this.prismaService.task.create({
      data: {
        title: task.title,
        description: task.description,
        due: new Date(task.due),
        status: task.status,
        assignees: {
          createMany: {
            data: [...task.assignees],
          },
        },
        project: {
          connect: {
            id: task.projectId,
          },
        },
        tags: {
          create: task.tags.map((tag) => {
            const existTag = projectTags.find((o) => o.name === tag.name);
            if (!existTag) {
              return {
                tag: {
                  create: {
                    name: tag.name,
                    colorScheme: tag.colorScheme,
                    projectId: task.projectId,
                  },
                },
              };
            } else {
              return {
                tag: {
                  connect: {
                    id: existTag.id,
                  },
                },
              };
            }
          }),
        },
      },
      include: {
        assignees: true,
        tags: true,
      },
    });

    const currentProject = await this.projectService.getCurrentProject(
      task.projectId,
    );

    return {
      task: newTask,
      currentProject,
    };
  }
}
