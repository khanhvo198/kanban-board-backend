import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService, Payload } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: Payload }> {
    return this.authService.login(req.user, res);
  }
}
