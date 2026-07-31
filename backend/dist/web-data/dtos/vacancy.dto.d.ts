export declare class CreateVacancyDto {
    title: string;
    description: string;
    requirements?: string;
    location?: string;
    deadline?: string;
}
export declare class UpdateVacancyDto {
    title?: string;
    description?: string;
    requirements?: string;
    location?: string;
    deadline?: string;
    isActive?: boolean;
}
