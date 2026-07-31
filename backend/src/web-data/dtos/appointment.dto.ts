import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: '1' })
  @IsString()
  doctorId: string;

  @ApiProperty({ example: 'Dr. John Doe' })
  @IsString()
  doctorName: string;

  @ApiPropertyOptional({ example: 'Cardiology' })
  @IsOptional()
  @IsString()
  doctorSpecialty?: string;

  @ApiProperty({ example: 'Abebe Kebede' })
  @IsString()
  patientName: string;

  @ApiProperty({ example: '+251 91X XXX XXX' })
  @IsString()
  patientPhone: string;

  @ApiPropertyOptional({ example: 'abebe@example.com' })
  @IsOptional()
  @IsEmail()
  patientEmail?: string;

  @ApiPropertyOptional({ example: 'I have chest pain' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: '2026-08-15' })
  @IsString()
  appointmentDate: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  appointmentTime: string;
}

export class UpdateAppointmentDto {
  @IsOptional() @IsString() patientName?: string;
  @IsOptional() @IsString() patientPhone?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() appointmentDate?: string;
  @IsOptional() @IsString() appointmentTime?: string;
  @IsOptional() @IsString() status?: string;
}
