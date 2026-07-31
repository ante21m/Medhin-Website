import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from '../entities/faq.entity';
import { CreateFaqDto, UpdateFaqDto } from '../dtos/faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private repo: Repository<Faq>,
  ) {}

  findAll(): Promise<Faq[]> {
    return this.repo.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  findAllAdmin(): Promise<Faq[]> {
    return this.repo.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<Faq> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('FAQ not found');
    return item;
  }

  create(dto: CreateFaqDto): Promise<Faq> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateFaqDto): Promise<Faq> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
