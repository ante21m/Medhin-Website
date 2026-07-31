import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto, UpdateVacancyDto } from '../dtos/vacancy.dto';
export declare class VacancyController {
    private readonly vacancyService;
    constructor(vacancyService: VacancyService);
    findAll(): Promise<import("../entities/vacancy.entity").Vacancy[]>;
    findAllAdmin(): Promise<import("../entities/vacancy.entity").Vacancy[]>;
    findOne(id: string): Promise<import("../entities/vacancy.entity").Vacancy>;
    create(dto: CreateVacancyDto): Promise<import("../entities/vacancy.entity").Vacancy>;
    update(id: string, dto: UpdateVacancyDto): Promise<import("../entities/vacancy.entity").Vacancy>;
    remove(id: string): Promise<void>;
}
