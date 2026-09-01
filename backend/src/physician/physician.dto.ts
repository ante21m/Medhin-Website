import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePhysicianDto {
  @ApiProperty({ example: 'Dr. Derneke Kebede', description: 'Physician name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'ዶ/ር ደርነቀ ከበደ', description: 'Amharic name' })
  @IsOptional() @IsString()
  nameAm?: string;

  @ApiProperty({ example: 'Cardiology', description: 'Specialty' })
  @IsString()
  specialty: string;

  @ApiPropertyOptional({ example: 'የልብ ህክምና', description: 'Amharic specialty' })
  @IsOptional() @IsString()
  specialtyAm?: string;

  @ApiPropertyOptional({ example: 'uploads/physicians/doctor.jpg', description: 'Image path' })
  @IsOptional() @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 4.5, description: 'Rating' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  rating?: number;

  @ApiPropertyOptional({ example: 120, description: 'Review count' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  reviews?: number;

  @ApiPropertyOptional({ example: true, description: 'Availability status' })
  @IsOptional() @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  available?: boolean;

  @ApiPropertyOptional({ example: 'Available Mon-Fri', description: 'Availability text' })
  @IsOptional() @IsString()
  availabilityText?: string;

  @ApiPropertyOptional({ example: 'Experienced cardiologist...', description: 'Bio' })
  @IsOptional() @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'ልምድ ያለው የልብ ሐኪም...', description: 'Amharic bio' })
  @IsOptional() @IsString()
  bioAm?: string;

  @ApiPropertyOptional({ example: '15+ years', description: 'Experience summary' })
  @IsOptional() @IsString()
  experience?: string;

  @ApiPropertyOptional({ example: ['English', 'Amharic'], description: 'Languages' })
  @IsOptional() @IsArray()
  languages?: string[];

  @ApiPropertyOptional({ example: ['MD, AAU', 'Fellowship in Cardiology'], description: 'Education' })
  @IsOptional() @IsArray()
  education?: string[];

  @ApiPropertyOptional({ example: ['Board Certified', 'ACC Member'], description: 'Certifications' })
  @IsOptional() @IsArray()
  certifications?: string[];

  @ApiPropertyOptional({ example: ['Echocardiography', 'Angioplasty'], description: 'Specialties list' })
  @IsOptional() @IsArray()
  specialtiesList?: string[];

  @ApiPropertyOptional({ example: ['Heart Surgery', 'Stent Placement'], description: 'Procedures' })
  @IsOptional() @IsArray()
  procedures?: string[];

  @ApiPropertyOptional({ example: 15, description: 'Years of experience' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  experienceYears?: number;

  @ApiPropertyOptional({ example: '5000+', description: 'Patients count' })
  @IsOptional() @IsString()
  patientsCount?: string;
}

export class UpdatePhysicianDto {
  @ApiPropertyOptional({ description: 'Physician name' })
  @IsOptional() @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Amharic name' })
  @IsOptional() @IsString()
  nameAm?: string;

  @ApiPropertyOptional({ description: 'Specialty' })
  @IsOptional() @IsString()
  specialty?: string;

  @ApiPropertyOptional({ description: 'Amharic specialty' })
  @IsOptional() @IsString()
  specialtyAm?: string;

  @ApiPropertyOptional({ description: 'Image path' })
  @IsOptional() @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Rating' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  rating?: number;

  @ApiPropertyOptional({ description: 'Review count' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  reviews?: number;

  @ApiPropertyOptional({ description: 'Availability status' })
  @IsOptional() @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  available?: boolean;

  @ApiPropertyOptional({ description: 'Availability text' })
  @IsOptional() @IsString()
  availabilityText?: string;

  @ApiPropertyOptional({ description: 'Bio' })
  @IsOptional() @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: 'Amharic bio' })
  @IsOptional() @IsString()
  bioAm?: string;

  @ApiPropertyOptional({ description: 'Experience summary' })
  @IsOptional() @IsString()
  experience?: string;

  @ApiPropertyOptional({ description: 'Languages' })
  @IsOptional() @IsArray()
  languages?: string[];

  @ApiPropertyOptional({ description: 'Education' })
  @IsOptional() @IsArray()
  education?: string[];

  @ApiPropertyOptional({ description: 'Certifications' })
  @IsOptional() @IsArray()
  certifications?: string[];

  @ApiPropertyOptional({ description: 'Specialties list' })
  @IsOptional() @IsArray()
  specialtiesList?: string[];

  @ApiPropertyOptional({ description: 'Procedures' })
  @IsOptional() @IsArray()
  procedures?: string[];

  @ApiPropertyOptional({ description: 'Years of experience' })
  @IsOptional() @IsNumber()
  @Transform(({ value }) => Number(value))
  experienceYears?: number;

  @ApiPropertyOptional({ description: 'Patients count' })
  @IsOptional() @IsString()
  patientsCount?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional() @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
