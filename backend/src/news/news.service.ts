import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  findAll(): Promise<News[]> {
    return this.newsRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  findAllAdmin(): Promise<News[]> {
    return this.newsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) throw new NotFoundException('News not found');
    return news;
  }

  create(dto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create(dto);
    return this.newsRepository.save(news);
  }

  async update(id: number, dto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);
    Object.assign(news, dto);
    return this.newsRepository.save(news);
  }

  async remove(id: number): Promise<void> {
    const news = await this.findOne(id);
    await this.newsRepository.remove(news);
  }
}
