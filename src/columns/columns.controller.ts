import { Body, Controller, Param, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnRequest } from './dto/create-column.request';

@Controller('projects/:projectId/columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @Post()
  async createColumn(
    @Param('projectId') projectId: string,
    @Body() body: CreateColumnRequest,
  ) {
    const { column } = body;

    return await this.columnService.createNewColumn(column, projectId);
  }
}
