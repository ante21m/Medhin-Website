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
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active news (public)' })
  findAll() {
    return this.newsService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all news including inactive (admin)' })
  findAllAdmin() {
    return this.newsService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create news (admin)' })
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update news (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(+id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete news (admin)' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
