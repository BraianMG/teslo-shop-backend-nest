import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // Equivalente a habilitar enableImplicitConversions: true
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number) // Equivalente a habilitar enableImplicitConversions: true
  offset?: number;
}
