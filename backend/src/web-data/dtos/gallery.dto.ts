import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty({ example: 'Office Opening', description: 'Gallery item title' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'uploads/gallery/photo.jpg',
    description: 'Image path',
  })
  @IsString()
  image: string;

  @ApiPropertyOptional({ description: 'Image description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}

export class UpdateGalleryDto {
  @ApiPropertyOptional({ description: 'Gallery item title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Image path' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Image description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}
