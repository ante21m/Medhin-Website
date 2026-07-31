import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PhysicianService } from './physician.service';
import { CreatePhysicianDto, UpdatePhysicianDto } from './physician.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Physicians')
@Controller('physicians')
export class PhysicianController {
  constructor(private readonly physicianService: PhysicianService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active physicians (public)' })
  findAll() {
    return this.physicianService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all physicians including inactive (admin)' })
  findAllAdmin() {
    return this.physicianService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get physician by ID' })
  findOne(@Param('id') id: string) {
    return this.physicianService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create physician (admin)' })
  create(@Body() dto: CreatePhysicianDto) {
    return this.physicianService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update physician (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdatePhysicianDto) {
    return this.physicianService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete physician (admin)' })
  remove(@Param('id') id: string) {
    return this.physicianService.remove(+id);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed physicians from config (admin)' })
  seed() {
    return this.physicianService.seed();
  }
}
