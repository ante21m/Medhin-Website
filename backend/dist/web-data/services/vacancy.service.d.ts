import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { CreateVacancyDto, UpdateVacancyDto } from '../dtos/vacancy.dto';
export declare class VacancyService {
    private vacancyRepository;
    constructor(vacancyRepository: Repository<Vacancy>);
    findAll(): Promise<Vacancy[]>;
    findAllAdmin(): Promise<Vacancy[]>;
    findOne(id: number): Promise<Vacancy>;
    create(dto: CreateVacancyDto): Promise<Vacancy>;
    update(id: number, dto: UpdateVacancyDto): Promise<Vacancy>;
    remove(id: number): Promise<void>;
}
