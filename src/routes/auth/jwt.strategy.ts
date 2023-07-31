import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './dtos/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: authService.cookieOrHeaderExtractor,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: JwtPayload) {
    // return this.authService.validaUsuario(payload.id);
    return payload;
  }
}
