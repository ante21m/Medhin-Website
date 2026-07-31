import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSocialDto {
  @ApiProperty({ example: 'Facebook', description: 'Social platform name' })
  @IsString()
  platform: string;

  @ApiProperty({
    example: 'https://facebook.com/company',
    description: 'Profile URL',
  })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 'facebook', description: 'Icon identifier' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}

export class UpdateSocialDto {
  @ApiPropertyOptional({ description: 'Social platform name' })
  @IsOptional()
  @IsString()
  platform?: string;

  @ApiPropertyOptional({ description: 'Profile URL' })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({ description: 'Icon identifier' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}
