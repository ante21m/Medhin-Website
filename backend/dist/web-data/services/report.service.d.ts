import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto, UpdateReportDto } from '../dtos/report.dto';
export declare class ReportService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    findAll(): Promise<Report[]>;
    findAllAdmin(): Promise<Report[]>;
    findOne(id: number): Promise<Report>;
    create(dto: CreateReportDto): Promise<Report>;
    update(id: number, dto: UpdateReportDto): Promise<Report>;
    remove(id: number): Promise<void>;
}
