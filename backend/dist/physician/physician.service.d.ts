import { Repository } from 'typeorm';
import { Physician } from './physician.entity';
import { CreatePhysicianDto, UpdatePhysicianDto } from './physician.dto';
export declare class PhysicianService {
    private physicianRepository;
    constructor(physicianRepository: Repository<Physician>);
    findAll(): Promise<Physician[]>;
    findAllAdmin(): Promise<Physician[]>;
    findOne(id: number): Promise<Physician>;
    create(dto: CreatePhysicianDto): Promise<Physician>;
    update(id: number, dto: UpdatePhysicianDto): Promise<Physician>;
    remove(id: number): Promise<void>;
    seed(): Promise<Physician[]>;
}
