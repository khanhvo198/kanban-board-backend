import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { on } from 'events';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {

  constructor(private readonly prismaService: PrismaService) { }


  async findAllProjectByUser(userId: string): Promise<{ projects: Project[] }> {
    const projects = await this.prismaService.project.findMany({
      where: {
        members: {
          some: {
            userId: userId
          }
        }
      }
    })

    return {
      projects
    }
  }

  async createNewProject(project: Project, userId: string): Promise<{ project: Project }> {
    const newProject = await this.prismaService.project.create({
      data: {
        name: project.name,
        members: {
          create: {
            userId
          }
        }
      },
    })

    return {
      project: newProject
    }
  }

  async updateProject(project: Project, id: string): Promise<{ project: Project }> {
    const updatedProject = await this.prismaService.project.update({
      data: {
        ...project
      },
      where: {
        id: id
      }
    })
    console.log(updatedProject)

    return {
      project: updatedProject
    }
  }

}
