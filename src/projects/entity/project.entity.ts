import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  id: string;
  name: string;
}
