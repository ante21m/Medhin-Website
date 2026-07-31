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
import { DepartmentService } from '../services/department.service';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from '../dtos/department.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active departments (public)' })
  findAll() {
    return this.departmentService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all departments including inactive (admin)' })
  findAllAdmin() {
    return this.departmentService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get department by ID' })
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create department (admin)' })
  create(@Body() dto: CreateDepartmentDto) {
    return this.departmentService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update department (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete department (admin)' })
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed departments from config' })
  seed() {
    return this.departmentService.seed();
  }
}
