export interface AuthenticatedRequestUser {
  userId: string;
  email: string;
  role: 'SUPERADMIN' | 'ORGANISATEUR' | 'PARTICIPANT';
  organizationId: string;
}
