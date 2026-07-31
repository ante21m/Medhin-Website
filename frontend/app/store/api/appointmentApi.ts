import { baseApi } from './baseApi';

export interface Appointment {
  id: number;
  doctorId: string;
  doctorName: string;
  doctorSpecialty?: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  notes?: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentDto {
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

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation<Appointment, CreateAppointmentDto>({
      query: (body) => ({
        url: '/appointments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Appointment'],
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => '/appointments',
      providesTags: ['Appointment'],
    }),
  }),
});

export const { useCreateAppointmentMutation, useGetAppointmentsQuery } = appointmentApi;
