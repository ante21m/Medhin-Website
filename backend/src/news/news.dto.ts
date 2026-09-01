import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiPropertyOptional({ example: 'Company Announcement', description: 'News title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'የኩባንያ ማስታወቂያ', description: 'News title in Amharic' })
  @IsOptional()
  @IsString()
  titleAm?: string;

  @ApiPropertyOptional({
    example: 'Full news content here...',
    description: 'News content body',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example: 'ሙሉ የዜና ይዘት እዚህ...',
    description: 'News content body in Amharic',
  })
  @IsOptional()
  @IsString()
  contentAm?: string;

  @ApiPropertyOptional({
    example: 'Short summary of the news',
    description: 'Brief summary',
  })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({
    example: 'የዜናው አጭር ማጠቃለያ',
    description: 'Brief summary in Amharic',
  })
  @IsOptional()
  @IsString()
  summaryAm?: string;

  @ApiPropertyOptional({
    example: 'uploads/news/image.jpg',
    description: 'Image path',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: 'uploads/news/document.pdf',
    description: 'Attachment path',
  })
  @IsOptional()
  @IsString()
  attachment?: string;

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

  @ApiPropertyOptional({ description: 'News title in Amharic' })
  @IsOptional()
  @IsString()
  titleAm?: string;

  @ApiPropertyOptional({ description: 'News content body' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'News content body in Amharic' })
  @IsOptional()
  @IsString()
  contentAm?: string;

  @ApiPropertyOptional({ description: 'Brief summary' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ description: 'Brief summary in Amharic' })
  @IsOptional()
  @IsString()
  summaryAm?: string;

  @ApiPropertyOptional({ description: 'Image path' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Attachment path' })
  @IsOptional()
  @IsString()
  attachment?: string;

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
