import { IsString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Contenu du commentaire',
    example: 'Très bon événement, bien organisé.',
  })
  @IsString()
  content!: string;

  @ApiProperty({
    description: 'Note sur 5',
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;
}
