import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }
}
