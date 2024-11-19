import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.Authentication,
      ]),
      secretOrKey: 'Test test test',
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}
