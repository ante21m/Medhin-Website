import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
export declare class ServiceService {
    private serviceRepository;
    constructor(serviceRepository: Repository<Service>);
    findAll(): Promise<Service[]>;
    findAllAdmin(): Promise<Service[]>;
    findOne(id: number): Promise<Service>;
    create(dto: CreateServiceDto): Promise<Service>;
    update(id: number, dto: UpdateServiceDto): Promise<Service>;
    remove(id: number): Promise<void>;
    seed(): Promise<Service[]>;
}
