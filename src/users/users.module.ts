import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersController } from "./users.controller";




@Module({
  imports: [
    PrismaModule
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule { }
