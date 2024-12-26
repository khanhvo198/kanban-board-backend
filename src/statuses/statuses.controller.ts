import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReqCreateStatusDto } from './dto/request/reqCreateStatus.dto';
import { StatusesService } from './statuses.service';

@Controller('projects/:projectId/columns')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  async createStatus(
    @Param('projectId') projectId: string,
    @Body() body: ReqCreateStatusDto,
  ) {
    const { status } = body;

    return await this.statusesService.createNewStatus(status, projectId);
  }
}
