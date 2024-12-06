import { Prisma } from '@prisma/client';

type TaskWithAssignees = Prisma.TaskGetPayload<{
  include: { assignees: true };
}>;

interface Tag {
  name: string;
  colorScheme: string;
}

export interface TaskPayload extends TaskWithAssignees {
  tags: Tag[];
}
