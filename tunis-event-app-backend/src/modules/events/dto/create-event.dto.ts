import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsObject,
  IsOptional,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  startDate!: Date;

  @IsDateString()
  endDate!: Date;

  @IsObject()
  venue!: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  tags!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsObject()
  @IsOptional()
  theme?: Record<string, any>;

  @IsObject()
  @IsOptional()
  badges?: Record<string, any>;
}
