import { ReportService } from '../services/report.service';
import { CreateReportDto, UpdateReportDto } from '../dtos/report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    findAll(): Promise<import("../entities/report.entity").Report[]>;
    findAllAdmin(): Promise<import("../entities/report.entity").Report[]>;
    findOne(id: string): Promise<import("../entities/report.entity").Report>;
    create(dto: CreateReportDto): Promise<import("../entities/report.entity").Report>;
    update(id: string, dto: UpdateReportDto): Promise<import("../entities/report.entity").Report>;
    remove(id: string): Promise<void>;
}
