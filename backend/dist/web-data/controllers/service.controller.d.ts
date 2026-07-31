import { ServiceService } from '../services/service.service';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    findAll(): Promise<import("../entities/service.entity").Service[]>;
    findAllAdmin(): Promise<import("../entities/service.entity").Service[]>;
    findOne(id: string): Promise<import("../entities/service.entity").Service>;
    create(dto: CreateServiceDto): Promise<import("../entities/service.entity").Service>;
    update(id: string, dto: UpdateServiceDto): Promise<import("../entities/service.entity").Service>;
    remove(id: string): Promise<void>;
    seed(): Promise<import("../entities/service.entity").Service[]>;
}
