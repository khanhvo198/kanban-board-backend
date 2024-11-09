import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user/user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class AppModule { }
