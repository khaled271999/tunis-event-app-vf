import { Role } from '@prisma/client';
import { RegisterDto } from './register.dto';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterOrganisateurDto extends RegisterDto {
  @ApiProperty({ example: "Nom de l'organisation" })
  @IsNotEmpty()
  orgName!: string;

  @ApiProperty({ example: "Description de l'organisation", required: false })
  @IsOptional()
  orgDescription?: string;

  @ApiProperty({ enum: Role, default: Role.ORGANISATEUR })
  @IsEnum(Role)
  role: Role = Role.ORGANISATEUR;
}
