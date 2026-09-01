import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Emergency Care', description: 'Service name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'የድንገተኛ እንክብካቤ', description: 'Amharic service name' })
  @IsOptional() @IsString()
  nameAm?: string;

  @ApiPropertyOptional({ example: 'ambulance', description: 'Icon identifier' })
  @IsOptional() @IsString()
  icon?: string;

  @ApiPropertyOptional({ example: '24/7 emergency medical services...', description: 'Service description' })
  @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'የ24/7 የድንገተኛ ሕክምና አገልግሎት...', description: 'Amharic service description' })
  @IsOptional() @IsString()
  descriptionAm?: string;

  @ApiPropertyOptional({ example: 'uploads/services/emergency.jpg', description: 'Image path' })
  @IsOptional() @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}

export class UpdateServiceDto {
  @ApiPropertyOptional({ description: 'Service name' })
  @IsOptional() @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Amharic service name' })
  @IsOptional() @IsString()
  nameAm?: string;

  @ApiPropertyOptional({ description: 'Icon identifier' })
  @IsOptional() @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: 'Service description' })
  @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Amharic service description' })
  @IsOptional() @IsString()
  descriptionAm?: string;

  @ApiPropertyOptional({ description: 'Image path' })
  @IsOptional() @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional() @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
