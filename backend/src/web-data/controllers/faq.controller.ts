import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FaqService } from '../services/faq.service';
import { CreateFaqDto, UpdateFaqDto } from '../dtos/faq.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqController {
  constructor(private readonly service: FaqService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active FAQs (public)' })
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
  create(@Body() dto: CreateFaqDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
