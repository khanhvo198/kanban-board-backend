import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStatusDto } from './dto/createStatus.dto';

@Injectable()
export class StatusesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewStatus(status: CreateStatusDto, projectId: string) {
    const newStatus = await this.prismaService.status.create({
      data: {
        name: status.name,
        projectId,
      },
    });

    return { status: newStatus };
  }
}
