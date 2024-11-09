import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UserService) { }

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