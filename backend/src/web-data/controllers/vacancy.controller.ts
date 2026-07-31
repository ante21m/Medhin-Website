import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto, UpdateVacancyDto } from '../dtos/vacancy.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Vacancies')
@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active vacancies (public)' })
  findAll() {
    return this.vacancyService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all vacancies including inactive (admin)' })
  findAllAdmin() {
    return this.vacancyService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vacancy by ID' })
  findOne(@Param('id') id: string) {
    return this.vacancyService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create vacancy (admin)' })
  create(@Body() dto: CreateVacancyDto) {
    return this.vacancyService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update vacancy (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateVacancyDto) {
    return this.vacancyService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete vacancy (admin)' })
  remove(@Param('id') id: string) {
    return this.vacancyService.remove(+id);
  }
}
