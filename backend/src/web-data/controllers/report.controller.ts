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
import { ReportService } from '../services/report.service';
import { CreateReportDto, UpdateReportDto } from '../dtos/report.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active reports (public)' })
  findAll() {
    return this.reportService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all reports including inactive (admin)' })
  findAllAdmin() {
    return this.reportService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create report (admin)' })
  create(@Body() dto: CreateReportDto) {
    return this.reportService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update report (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateReportDto) {
    return this.reportService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete report (admin)' })
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
