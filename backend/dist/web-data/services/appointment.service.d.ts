import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dtos/appointment.dto';
export declare class AppointmentService {
    private repo;
    constructor(repo: Repository<Appointment>);
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    create(dto: CreateAppointmentDto): Promise<Appointment>;
    update(id: number, dto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: number): Promise<void>;
}
