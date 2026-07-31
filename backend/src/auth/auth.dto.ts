import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'admin', description: 'Username' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password (min 6 chars)',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString()
  password: string;
}
