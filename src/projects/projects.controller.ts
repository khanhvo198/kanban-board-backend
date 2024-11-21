import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProjectRequest } from './dto/create-project.request';
import { UpdateProjectRequest } from './dto/update-project.request';
import { ProjectService } from './projects.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  async getCurrentProject(
    @Param('id') id: string,
  ): Promise<{ project: Project }> {
    const project = await this.projectService.getCurrentProject(id);
    return { project };
  }

  @Get()
  async getAllProject(@Request() req: any): Promise<{ projects: Project[] }> {
    return await this.projectService.findAllProjectByUser(req.user.id);
  }

  @Post()
  async createProject(@Body() body: CreateProjectRequest, @Request() req: any) {
    const { project } = body;
    return await this.projectService.createNewProject(project, req.user.id);
  }

  @Put(':id')
  async updateProject(
    @Body() body: UpdateProjectRequest,
    @Param('id') id: string,
  ) {
    const { project } = body;
    return await this.projectService.updateProject(project, id);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {}
}
