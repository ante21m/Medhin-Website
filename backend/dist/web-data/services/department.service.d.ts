import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
export declare class DepartmentService {
    private departmentRepository;
    constructor(departmentRepository: Repository<Department>);
    findAll(): Promise<Department[]>;
    findAllAdmin(): Promise<Department[]>;
    findOne(id: number): Promise<Department>;
    create(dto: CreateDepartmentDto): Promise<Department>;
    update(id: number, dto: UpdateDepartmentDto): Promise<Department>;
    remove(id: number): Promise<void>;
    seed(): Promise<Department[]>;
}
