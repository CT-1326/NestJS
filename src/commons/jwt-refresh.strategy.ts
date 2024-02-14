import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      //   secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
  }

  vaildate(payload) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
