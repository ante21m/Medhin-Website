import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active services (public)' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all services including inactive (admin)' })
  findAllAdmin() {
    return this.serviceService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create service (admin)' })
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update service (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete service (admin)' })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed services from config' })
  seed() {
    return this.serviceService.seed();
  }
}
