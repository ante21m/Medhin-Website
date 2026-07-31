import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Social } from '../entities/social.entity';
import { CreateSocialDto, UpdateSocialDto } from '../dtos/social.dto';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Social)
    private socialRepository: Repository<Social>,
  ) {}

  findAll(): Promise<Social[]> {
    return this.socialRepository.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<Social> {
    const social = await this.socialRepository.findOne({ where: { id } });
    if (!social) throw new NotFoundException('Social link not found');
    return social;
  }

  create(dto: CreateSocialDto): Promise<Social> {
    const social = this.socialRepository.create(dto);
    return this.socialRepository.save(social);
  }

  async update(id: number, dto: UpdateSocialDto): Promise<Social> {
    const social = await this.findOne(id);
    Object.assign(social, dto);
    return this.socialRepository.save(social);
  }

  async remove(id: number): Promise<void> {
    const social = await this.findOne(id);
    await this.socialRepository.remove(social);
  }
}
