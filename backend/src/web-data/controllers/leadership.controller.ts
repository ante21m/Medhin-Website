import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeadershipService } from '../services/leadership.service';
import { CreateLeadershipDto, UpdateLeadershipDto } from '../dtos/leadership.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Leadership')
@Controller('leadership')
export class LeadershipController {
  constructor(private readonly service: LeadershipService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active leadership (public)' })
  findAll() {
    return this.service.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAllAdmin() {
    return this.service.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreateLeadershipDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateLeadershipDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Post('seed')
  seed() {
    return this.service.seed();
  }
}
