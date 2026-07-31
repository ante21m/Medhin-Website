import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { CreateVacancyDto, UpdateVacancyDto } from '../dtos/vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  findAll(): Promise<Vacancy[]> {
    return this.vacancyRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  findAllAdmin(): Promise<Vacancy[]> {
    return this.vacancyRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Vacancy> {
    const vacancy = await this.vacancyRepository.findOne({ where: { id } });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    return vacancy;
  }

  async create(dto: CreateVacancyDto): Promise<Vacancy> {
    const vacancy = this.vacancyRepository.create({
      title: dto.title,
      description: dto.description,
      requirements: dto.requirements,
      location: dto.location,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
    });
    return this.vacancyRepository.save(vacancy);
  }

  async update(id: number, dto: UpdateVacancyDto): Promise<Vacancy> {
    const vacancy = await this.findOne(id);
    Object.assign(vacancy, dto);
    return this.vacancyRepository.save(vacancy);
  }

  async remove(id: number): Promise<void> {
    const vacancy = await this.findOne(id);
    await this.vacancyRepository.remove(vacancy);
  }
}
