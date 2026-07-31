import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianService } from './physician.service';
import { PhysicianController } from './physician.controller';
import { Physician } from './physician.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Physician]), AuthModule],
  providers: [PhysicianService],
  controllers: [PhysicianController],
})
export class PhysicianModule {}
