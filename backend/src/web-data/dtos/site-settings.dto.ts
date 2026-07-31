import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSiteSettingDto {
  @ApiProperty({ example: 'home_stats_experience', description: 'Unique setting key' })
  @IsString()
  key: string;

  @ApiProperty({ example: '25+', description: 'Setting value (JSON string for arrays/objects)' })
  @IsString()
  value: string;

  @ApiPropertyOptional({ example: 'home', description: 'Setting group' })
  @IsOptional()
  @IsString()
  group?: string;
}

export class UpdateSiteSettingDto {
  @ApiPropertyOptional({ description: 'Setting value' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({ description: 'Setting group' })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
