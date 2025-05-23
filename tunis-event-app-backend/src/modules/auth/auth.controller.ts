import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { OrganizationService } from '../organization/organization.service';
import { RegisterOrganisateurDto } from './dto/register-organisateur.dto';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly organizationService: OrganizationService,
  ) {}

  /**
   * ✅ Inscription standard (PARTICIPANT)
   */
  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * ✅ Connexion
   */
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * ✅ Inscription d'un ORGANISATEUR avec création de l'organisation
   */
  @Post('register-organisateur')
  async registerOrganisateur(@Body() body: RegisterOrganisateurDto) {
    console.log('📥 Reçu dans le controller register-organisateur:', body);

    try {
      // On fusionne manuellement le role ici pour éviter que le validator le supprime
      const userDto = {
        ...body,
        role: Role.ORGANISATEUR,
      };

      const result = await this.authService.register(userDto);

      await this.organizationService.createOrganization({
        name: body.orgName,
        description: body.orgDescription,
        userId: result.id,
      });

      return { message: 'Organisateur enregistré avec organisation' };
    } catch (err) {
      console.error('❌ Erreur backend :', (err as Error).message, err);
      throw err;
    }
  }
}
