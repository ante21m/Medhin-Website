import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ example: 'Company Announcement', description: 'News title' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Full news content here...',
    description: 'News content body',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    example: 'Short summary of the news',
    description: 'Brief summary',
  })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({
    example: 'uploads/news/image.jpg',
    description: 'Image path',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 'Admin', description: 'Author name' })
  @IsOptional()
  @IsString()
  author?: string;
}

export class UpdateNewsDto {
  @ApiPropertyOptional({ description: 'News title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'News content body' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Brief summary' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ description: 'Image path' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Author name' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
