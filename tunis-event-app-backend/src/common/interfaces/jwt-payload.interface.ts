export interface JwtPayload {
  sub: string;
  email: string;
  role: 'SUPERADMIN' | 'ORGANISATEUR' | 'PARTICIPANT';
}
