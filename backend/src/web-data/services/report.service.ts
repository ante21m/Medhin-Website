import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto, UpdateReportDto } from '../dtos/report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  findAll(): Promise<Report[]> {
    return this.reportRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  findAllAdmin(): Promise<Report[]> {
    return this.reportRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  create(dto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create(dto);
    return this.reportRepository.save(report);
  }

  async update(id: number, dto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);
    Object.assign(report, dto);
    return this.reportRepository.save(report);
  }

  async remove(id: number): Promise<void> {
    const report = await this.findOne(id);
    await this.reportRepository.remove(report);
  }
}
