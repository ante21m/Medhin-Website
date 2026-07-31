import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVacancyDto {
  @ApiProperty({ example: 'Software Engineer', description: 'Job title' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'We are looking for...',
    description: 'Job description',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: '- 3+ years experience\n- TypeScript',
    description: 'Job requirements',
  })
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ example: 'New York, NY', description: 'Job location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    example: '2026-06-30',
    description: 'Application deadline',
  })
  @IsOptional()
  deadline?: string;
}

export class UpdateVacancyDto {
  @ApiPropertyOptional({ description: 'Job title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Job description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Job requirements' })
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ description: 'Job location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Application deadline' })
  @IsOptional()
  deadline?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
