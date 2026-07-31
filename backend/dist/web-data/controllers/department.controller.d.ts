import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    findAll(): Promise<import("../entities/department.entity").Department[]>;
    findAllAdmin(): Promise<import("../entities/department.entity").Department[]>;
    findOne(id: string): Promise<import("../entities/department.entity").Department>;
    create(dto: CreateDepartmentDto): Promise<import("../entities/department.entity").Department>;
    update(id: string, dto: UpdateDepartmentDto): Promise<import("../entities/department.entity").Department>;
    remove(id: string): Promise<void>;
    seed(): Promise<import("../entities/department.entity").Department[]>;
}
