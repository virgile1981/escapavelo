
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access_token,  
      ]),
      ignoreExpiration: false,
      secretOrKey: 'la-vie-en-bleu-&123&',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, login: payload.login };
  }
}
