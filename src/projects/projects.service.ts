import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllProjectByUser(userId: string): Promise<{ projects: Project[] }> {
    const projects = await this.prismaService.project.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    return {
      projects,
    };
  }

  async createNewProject(
    project: Project,
    userId: string,
  ): Promise<{ project: Project }> {
    console.log(project);

    const newProject = await this.prismaService.project.create({
      data: {
        name: project.name,
        members: {
          create: {
            userId,
            role: 'ADMIN',
          },
        },
      },
    });

    return {
      project: newProject,
    };
  }

  async updateProject(
    project: Project,
    id: string,
  ): Promise<{ project: Project }> {
    const updatedProject = await this.prismaService.project.update({
      data: {
        ...project,
      },
      where: {
        id: id,
      },
    });

    return {
      project: updatedProject,
    };
  }

  async getCurrentProject(projectId: string) {
    const currentProject = await this.prismaService.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        members: {
          select: {
            information: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        tasks: {
          include: {
            assignees: true,
            tags: {
              include: {
                tag: true,
              },
            },
            files: {
              select: {
                id: true,
              },
            },
            comments: {
              select: {
                id: true,
              },
            },
          },
        },
        id: true,
        name: true,
        tags: true,
        columns: true,
      },
    });

    return {
      ...currentProject,
      tasks: [
        ...currentProject.tasks.map((task: any) => ({
          ...task,
          tags: task.tags.map((tag: any) => ({
            id: tag.tag.id,
            name: tag.tag.name,
            colorScheme: tag.tag.colorScheme,
          })),
        })),
      ],
      columns: currentProject.columns.map((column) => column.name),
    };
  }
}
