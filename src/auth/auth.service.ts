import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { UserService } from 'src/users/users.service';

export interface Payload {
  email: string;
  id: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const payload: Payload = {
      email: user.email,
      id: user.id,
    };
    const token = this.jwtService.sign(payload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    return { user: payload };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
