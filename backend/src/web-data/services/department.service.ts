import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from '../dtos/department.dto';
import { seedDepartments } from '../department-seed-data';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { isActive: true },
      order: { order: 'ASC' },
    });
  }

  findAllAdmin(): Promise<Department[]> {
    return this.departmentRepository.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  create(dto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(dto);
    return this.departmentRepository.save(department);
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findOne(id);
    Object.assign(department, dto);
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
  }

  async seed(): Promise<Department[]> {
    const departments = this.departmentRepository.create(seedDepartments);
    return this.departmentRepository.save(departments);
  }
}
