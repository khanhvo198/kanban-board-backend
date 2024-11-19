import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './projects/projects.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProjectModule, UserModule],
  providers: [],
  controllers: [UserController],
})
export class AppModule {}
