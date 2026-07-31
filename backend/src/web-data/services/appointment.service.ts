import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dtos/appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Appointment> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Appointment not found');
    return item;
  }

  create(dto: CreateAppointmentDto): Promise<Appointment> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateAppointmentDto): Promise<Appointment> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
