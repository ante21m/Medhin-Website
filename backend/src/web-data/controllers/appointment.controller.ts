import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dtos/appointment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all appointments (admin)' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new appointment (public)' })
  create(@Body() dto: CreateAppointmentDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
