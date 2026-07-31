import { IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeadershipDto {
  @ApiProperty({ example: 'Dr. Kassaw Alemayehu' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'ዶ/ር ቃሳው አለማየሁ' })
  @IsOptional()
  @IsString()
  nameAm?: string;

  @ApiProperty({ example: 'CEO & Medical Director' })
  @IsString()
  role: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  roleAm?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  certificates?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  awards?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}

export class UpdateLeadershipDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() nameAm?: string;
  @IsOptional() @IsString() role?: string;
  @IsOptional() @IsString() roleAm?: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() experience?: string;
  @IsOptional() @IsArray() certificates?: string[];
  @IsOptional() @IsArray() awards?: string[];
  @IsOptional() @IsNumber() @Transform(({ value }) => Number(value)) order?: number;
  @IsOptional() @IsBoolean() @Transform(({ value }) => value === 'true' || value === true) isActive?: boolean;
}
