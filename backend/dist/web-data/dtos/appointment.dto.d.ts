export declare class CreateAppointmentDto {
    doctorId: string;
    doctorName: string;
    doctorSpecialty?: string;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    notes?: string;
    appointmentDate: string;
    appointmentTime: string;
}
export declare class UpdateAppointmentDto {
    patientName?: string;
    patientPhone?: string;
    notes?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    status?: string;
}
