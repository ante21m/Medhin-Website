import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SiteSettingsService } from '../services/site-settings.service';
import { CreateSiteSettingDto, UpdateSiteSettingDto } from '../dtos/site-settings.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Site Settings')
@Controller('site-settings')
export class SiteSettingsController {
  constructor(private readonly service: SiteSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active settings (public)' })
  findAll() {
    return this.service.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all settings including inactive (admin)' })
  findAllAdmin() {
    return this.service.findAllAdmin();
  }

  @Get('group/:group')
  @ApiOperation({ summary: 'Get settings by group' })
  findByGroup(@Param('group') group: string) {
    return this.service.findByGroup(group);
  }

  @Get('key/:key')
  @ApiOperation({ summary: 'Get a single setting by key' })
  get(@Param('key') key: string) {
    return this.service.get(key);
  }

  @Get('batch')
  @ApiOperation({ summary: 'Get multiple settings by keys (comma-separated)' })
  @ApiQuery({ name: 'keys', example: 'home_stats_experience,home_partners' })
  getMany(@Query('keys') keys: string) {
    return this.service.getMany(keys.split(','));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create setting (admin)' })
  create(@Body() dto: CreateSiteSettingDto) {
    return this.service.create(dto);
  }

  @Put(':key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update setting by key (admin)' })
  update(@Param('key') key: string, @Body() dto: UpdateSiteSettingDto) {
    return this.service.update(key, dto);
  }

  @Delete(':key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete setting by key (admin)' })
  remove(@Param('key') key: string) {
    return this.service.remove(key);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed default settings' })
  seed() {
    return this.service.seed();
  }
}
