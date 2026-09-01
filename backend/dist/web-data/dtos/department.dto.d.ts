export declare class CreateDepartmentDto {
    name: string;
    nameAm?: string;
    description?: string;
    descriptionAm?: string;
    image?: string;
    headOfDepartment?: string;
    email?: string;
    phone?: string;
    order?: number;
}
export declare class UpdateDepartmentDto {
    name?: string;
    nameAm?: string;
    description?: string;
    descriptionAm?: string;
    image?: string;
    headOfDepartment?: string;
    email?: string;
    phone?: string;
    order?: number;
    isActive?: boolean;
}
