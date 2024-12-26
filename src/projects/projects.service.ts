import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDto } from './dto/projectCreate.dto';
import { ProjectUpdateDto } from './dto/projectUpdate.dto';
import { ResProjectListDto } from './dto/response/resProjectList.dto';
import { ResProjectDto } from './dto/response/resProject.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllProjectByUser(userId: string): Promise<ResProjectListDto> {
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
    project: ProjectCreateDto,
    userId: string,
  ): Promise<ResProjectDto> {
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
    project: ProjectUpdateDto,
    id: string,
  ): Promise<ResProjectDto> {
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
