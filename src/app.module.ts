import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { ColumnsController } from './columns/columns.controller';
import { ColumnsService } from './columns/columns.service';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProjectModule,
    UserModule,
    TasksModule,
    ColumnsModule,
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})
export class AppModule {}
