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
import { SocialService } from '../services/social.service';
import { CreateSocialDto, UpdateSocialDto } from '../dtos/social.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Social Links')
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get()
  @ApiOperation({ summary: 'Get all social links (public)' })
  findAll() {
    return this.socialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get social link by ID' })
  findOne(@Param('id') id: string) {
    return this.socialService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create social link (admin)' })
  create(@Body() dto: CreateSocialDto) {
    return this.socialService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update social link (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateSocialDto) {
    return this.socialService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete social link (admin)' })
  remove(@Param('id') id: string) {
    return this.socialService.remove(+id);
  }
}
