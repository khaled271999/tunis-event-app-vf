import { IsOptional, IsString } from 'class-validator';

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  Name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
