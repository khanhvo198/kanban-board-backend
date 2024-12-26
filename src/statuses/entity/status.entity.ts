import { Status } from '@prisma/client';

export class StatusEntity implements Status {
  id: string;
  name: string;
  projectId: string;
}
