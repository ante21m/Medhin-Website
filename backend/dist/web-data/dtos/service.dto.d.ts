export declare class CreateServiceDto {
    name: string;
    nameAm?: string;
    icon?: string;
    description?: string;
    descriptionAm?: string;
    image?: string;
    order?: number;
}
export declare class UpdateServiceDto {
    name?: string;
    nameAm?: string;
    icon?: string;
    description?: string;
    descriptionAm?: string;
    image?: string;
    order?: number;
    isActive?: boolean;
}
