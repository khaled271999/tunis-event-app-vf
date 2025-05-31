import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    console.log('🔍 Required roles for route:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    console.log('👤 User from request in RolesGuard:', user);

    if (!user || !user.role) {
      console.log('❌ Access denied: user or role missing');
      return false;
    }

    const hasAccess = requiredRoles.includes(user.role);
    console.log('✅ Role access check result:', hasAccess);
    return hasAccess;
  }
}
