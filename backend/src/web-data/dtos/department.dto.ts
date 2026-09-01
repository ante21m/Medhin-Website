import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Marketing', description: 'Department name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'ማርኬቲንግ', description: 'Amharic department name' })
  @IsOptional()
  @IsString()
  nameAm?: string;

  @ApiPropertyOptional({ description: 'Department description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Amharic department description' })
  @IsOptional()
  @IsString()
  descriptionAm?: string;

  @ApiPropertyOptional({ description: 'Department image path' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Head of department name',
  })
  @IsOptional()
  @IsString()
  headOfDepartment?: string;

  @ApiPropertyOptional({
    example: 'marketing@company.com',
    description: 'Contact email',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    example: '+1 234 567 890',
    description: 'Contact phone',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}

export class UpdateDepartmentDto {
  @ApiPropertyOptional({ description: 'Department name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Amharic department name' })
  @IsOptional()
  @IsString()
  nameAm?: string;

  @ApiPropertyOptional({ description: 'Department description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Amharic department description' })
  @IsOptional()
  @IsString()
  descriptionAm?: string;

  @ApiPropertyOptional({ description: 'Department image path' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Head of department name' })
  @IsOptional()
  @IsString()
  headOfDepartment?: string;

  @ApiPropertyOptional({ description: 'Contact email' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Contact phone' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
