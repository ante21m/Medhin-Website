export declare class CreateDepartmentDto {
    name: string;
    description?: string;
    image?: string;
    headOfDepartment?: string;
    email?: string;
    phone?: string;
    order?: number;
}
export declare class UpdateDepartmentDto {
    name?: string;
    description?: string;
    image?: string;
    headOfDepartment?: string;
    email?: string;
    phone?: string;
    order?: number;
    isActive?: boolean;
}
