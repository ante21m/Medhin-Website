import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Physician } from './physician.entity';
import { CreatePhysicianDto, UpdatePhysicianDto } from './physician.dto';
import { seedPhysicians } from './seed-data';

@Injectable()
export class PhysicianService {
  constructor(
    @InjectRepository(Physician)
    private physicianRepository: Repository<Physician>,
  ) {}

  findAll(): Promise<Physician[]> {
    return this.physicianRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  findAllAdmin(): Promise<Physician[]> {
    return this.physicianRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Physician> {
    const physician = await this.physicianRepository.findOne({ where: { id } });
    if (!physician) throw new NotFoundException('Physician not found');
    return physician;
  }

  create(dto: CreatePhysicianDto): Promise<Physician> {
    const physician = this.physicianRepository.create(dto);
    return this.physicianRepository.save(physician);
  }

  async update(id: number, dto: UpdatePhysicianDto): Promise<Physician> {
    const physician = await this.findOne(id);
    Object.assign(physician, dto);
    return this.physicianRepository.save(physician);
  }

  async remove(id: number): Promise<void> {
    const physician = await this.findOne(id);
    await this.physicianRepository.remove(physician);
  }

  async seed(): Promise<Physician[]> {
    const physicians = this.physicianRepository.create(seedPhysicians);
    return this.physicianRepository.save(physicians);
  }
}
