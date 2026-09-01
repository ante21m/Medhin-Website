export declare class CreateVacancyDto {
    title: string;
    titleAm?: string;
    description: string;
    descriptionAm?: string;
    requirements?: string;
    requirementsAm?: string;
    location?: string;
    deadline?: string;
}
export declare class UpdateVacancyDto {
    title?: string;
    titleAm?: string;
    description?: string;
    descriptionAm?: string;
    requirements?: string;
    requirementsAm?: string;
    location?: string;
    deadline?: string;
    isActive?: boolean;
}
