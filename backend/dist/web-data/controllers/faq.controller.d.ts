import { FaqService } from '../services/faq.service';
import { CreateFaqDto, UpdateFaqDto } from '../dtos/faq.dto';
export declare class FaqController {
    private readonly service;
    constructor(service: FaqService);
    findAll(): Promise<import("../entities/faq.entity").Faq[]>;
    findAllAdmin(): Promise<import("../entities/faq.entity").Faq[]>;
    findOne(id: string): Promise<import("../entities/faq.entity").Faq>;
    create(dto: CreateFaqDto): Promise<import("../entities/faq.entity").Faq>;
    update(id: string, dto: UpdateFaqDto): Promise<import("../entities/faq.entity").Faq>;
    remove(id: string): Promise<void>;
}
