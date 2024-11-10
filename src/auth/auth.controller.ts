import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService, TokenPayload } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ tokenPayload: TokenPayload }> {
    return this.authService.login(req.user, res)
  }





}
