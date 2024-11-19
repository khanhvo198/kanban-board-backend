import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Payload } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get()
  async getCurrentUser(@Request() req: any): Promise<{ user: Payload }> {
    const user = req.user;
    console.log(user);
    return {
      user: {
        email: user.email,
        id: user.id,
      },
    };
  }
}
