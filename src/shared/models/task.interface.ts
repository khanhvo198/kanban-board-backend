import { Prisma } from '@prisma/client';

export type TaskPayLoad = Prisma.TaskGetPayload<{
  include: { assignees: true; subTasks: true; files: true };
}>;
