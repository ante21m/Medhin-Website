import { PhysicianService } from './physician.service';
import { CreatePhysicianDto, UpdatePhysicianDto } from './physician.dto';
export declare class PhysicianController {
    private readonly physicianService;
    constructor(physicianService: PhysicianService);
    findAll(): Promise<import("./physician.entity").Physician[]>;
    findAllAdmin(): Promise<import("./physician.entity").Physician[]>;
    findOne(id: string): Promise<import("./physician.entity").Physician>;
    create(dto: CreatePhysicianDto): Promise<import("./physician.entity").Physician>;
    update(id: string, dto: UpdatePhysicianDto): Promise<import("./physician.entity").Physician>;
    remove(id: string): Promise<void>;
    seed(): Promise<import("./physician.entity").Physician[]>;
}
