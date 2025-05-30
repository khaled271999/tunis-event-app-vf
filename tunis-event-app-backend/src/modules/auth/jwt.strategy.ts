import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt as OriginalExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

// ⛑️ Corriger le typage perdu de ExtractJwt
const ExtractJwt = OriginalExtractJwt as unknown as {
  fromAuthHeaderAsBearerToken(): (req: Request) => string | null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  validate(payload: JwtPayload) {
    const { sub, email, role } = payload;
    return { userId: sub, email, role };
  }
}
