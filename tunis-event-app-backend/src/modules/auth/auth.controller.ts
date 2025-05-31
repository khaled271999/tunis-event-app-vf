import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { OrganizationService } from '../organization/organization.service';
import { RegisterOrganisateurDto } from './dto/register-organisateur.dto';
import { Role } from '@prisma/client';
import { RegisterByAdminDto } from './dto/register-by-admin.dto';

import { Roles } from '../../common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register-organisateur')
  @ApiBody({ type: RegisterOrganisateurDto })
  async registerOrganisateur(@Body() dto: RegisterOrganisateurDto) {
    const user = await this.authService.register(dto);

    await this.organizationService.createOrganization({
      name: dto.orgName,
      description: dto.orgDescription,
      userId: user.id,
    });

    return { message: 'Organisateur enregistré avec organisation' };
  }

  @Roles(Role.SUPERADMIN)
  @Post('register-by-admin')
  @ApiBody({ type: RegisterByAdminDto })
  async registerByAdmin(@Body() dto: RegisterByAdminDto) {
    const user = await this.authService.register(dto);

    if (dto.role === Role.ORGANISATEUR) {
      await this.organizationService.createOrganization({
        name: dto.orgName!,
        description: dto.orgDescription,
        userId: user.id,
      });
    }

    return { message: `Utilisateur ${dto.role} ajouté avec succès.` };
  }
}
