import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dtos/appointment.dto';
export declare class AppointmentController {
    private readonly service;
    constructor(service: AppointmentService);
    findAll(): Promise<import("../entities/appointment.entity").Appointment[]>;
    findOne(id: string): Promise<import("../entities/appointment.entity").Appointment>;
    create(dto: CreateAppointmentDto): Promise<import("../entities/appointment.entity").Appointment>;
    update(id: string, dto: UpdateAppointmentDto): Promise<import("../entities/appointment.entity").Appointment>;
    remove(id: string): Promise<void>;
}
