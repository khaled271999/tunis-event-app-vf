import { Request } from 'express';

export interface JwtPayloadRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: 'SUPERADMIN' | 'ORGANISATEUR' | 'PARTICIPANT';
  };
}
