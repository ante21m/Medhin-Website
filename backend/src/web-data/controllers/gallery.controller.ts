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
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto, UpdateGalleryDto } from '../dtos/gallery.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all gallery items (public)' })
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gallery item by ID' })
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create gallery item (admin)' })
  create(@Body() dto: CreateGalleryDto) {
    return this.galleryService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gallery item (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateGalleryDto) {
    return this.galleryService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete gallery item (admin)' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed gallery items from config' })
  seed() {
    return this.galleryService.seed();
  }
}
