import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10, description: 'How many rows do you need'
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // Equivalente a habilitar enableImplicitConversions: true
  limit?: number;

  @ApiProperty({
    default: 0, description: 'How many rows do you wantto skip'
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number) // Equivalente a habilitar enableImplicitConversions: true
  offset?: number;
}
