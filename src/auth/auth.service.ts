import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs'
import { Response } from 'express';
import { UserService } from 'src/users/users.service';

export interface TokenPayload {
  userId: number
}

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(user: User, response: Response) {

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + (30 * 24 * 3600000)),
    });

    return { tokenPayload };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
