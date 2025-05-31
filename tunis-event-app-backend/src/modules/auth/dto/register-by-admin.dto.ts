import { IsEmail, IsEnum, IsString, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterByAdminDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
  password!: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ enum: Role, example: Role.SUPERADMIN })
  @IsEnum(Role)
  role!: Role;

  @ApiProperty({ example: 'Nom orga', required: false })
  @IsOptional()
  @IsString()
  orgName?: string;

  @ApiProperty({ example: 'Desc orga', required: false })
  @IsOptional()
  @IsString()
  orgDescription?: string;
}
