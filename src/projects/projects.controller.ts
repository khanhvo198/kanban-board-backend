import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReqProjectCreateDto } from './dto/request/reqProjectCreate.dto';
import { UpdateProjectRequest } from './dto/request/reqProjectUpdate.dto';
import { ResProjectDto } from './dto/response/resProject.dto';
import { ResProjectListDto } from './dto/response/resProjectList.dto';
import { ProjectService } from './projects.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  async getCurrentProject(@Param('id') id: string): Promise<ResProjectDto> {
    const project = await this.projectService.getCurrentProject(id);
    return { project };
  }

  @Get()
  async getAllProject(@Req() req: Request): Promise<ResProjectListDto> {
    return await this.projectService.findAllProjectByUser(req.user.id);
  }

  @Post()
  async createProject(@Body() body: ReqProjectCreateDto, @Req() req: Request) {
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
}
