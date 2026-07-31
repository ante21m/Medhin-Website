import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({ example: 'What are your visiting hours?' })
  @IsString()
  question: string;

  @ApiProperty({ example: 'We are open 24/7 for emergencies...' })
  @IsString()
  answer: string;

  @ApiPropertyOptional({ example: 'General' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;
}

export class UpdateFaqDto {
  @IsOptional() @IsString() question?: string;
  @IsOptional() @IsString() answer?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsNumber() @Transform(({ value }) => Number(value)) order?: number;
  @IsOptional() @IsBoolean() @Transform(({ value }) => value === 'true' || value === true) isActive?: boolean;
}
