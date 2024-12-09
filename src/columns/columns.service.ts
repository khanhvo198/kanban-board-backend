import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Column } from './dto/create-column.request';

@Injectable()
export class ColumnsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewColumn(column: Column, projectId: string) {
    const newColumn = await this.prismaService.column.create({
      data: {
        name: column.name,
        projectId,
      },
    });

    return { column: newColumn };
  }
}
