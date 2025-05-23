// register-organisateur.dto.ts
import { Role } from '@prisma/client';
import { RegisterDto } from './register.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterOrganisateurDto extends RegisterDto {
  @IsNotEmpty()
  orgName!: string;

  @IsOptional()
  orgDescription?: string;

  @IsEnum(Role)
  role: Role = Role.ORGANISATEUR;
}
