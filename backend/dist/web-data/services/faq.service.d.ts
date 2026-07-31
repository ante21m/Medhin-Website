import { Repository } from 'typeorm';
import { Faq } from '../entities/faq.entity';
import { CreateFaqDto, UpdateFaqDto } from '../dtos/faq.dto';
export declare class FaqService {
    private repo;
    constructor(repo: Repository<Faq>);
    findAll(): Promise<Faq[]>;
    findAllAdmin(): Promise<Faq[]>;
    findOne(id: number): Promise<Faq>;
    create(dto: CreateFaqDto): Promise<Faq>;
    update(id: number, dto: UpdateFaqDto): Promise<Faq>;
    remove(id: number): Promise<void>;
}
