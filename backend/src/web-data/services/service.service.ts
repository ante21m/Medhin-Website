import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
import { seedServices } from '../seed-data';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      where: { isActive: true },
      order: { order: 'ASC' },
    });
  }

  findAllAdmin(): Promise<Service[]> {
    return this.serviceRepository.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  create(dto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(dto);
    return this.serviceRepository.save(service);
  }

  async update(id: number, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }

  async seed(): Promise<Service[]> {
    const services = this.serviceRepository.create(seedServices);
    return this.serviceRepository.save(services);
  }
}
