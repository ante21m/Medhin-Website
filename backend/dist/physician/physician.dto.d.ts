export declare class CreatePhysicianDto {
    name: string;
    nameAm?: string;
    specialty: string;
    specialtyAm?: string;
    image?: string;
    rating?: number;
    reviews?: number;
    available?: boolean;
    availabilityText?: string;
    bio?: string;
    experience?: string;
    languages?: string[];
    education?: string[];
    certifications?: string[];
    specialtiesList?: string[];
    procedures?: string[];
    experienceYears?: number;
    patientsCount?: string;
}
export declare class UpdatePhysicianDto {
    name?: string;
    nameAm?: string;
    specialty?: string;
    specialtyAm?: string;
    image?: string;
    rating?: number;
    reviews?: number;
    available?: boolean;
    availabilityText?: string;
    bio?: string;
    experience?: string;
    languages?: string[];
    education?: string[];
    certifications?: string[];
    specialtiesList?: string[];
    procedures?: string[];
    experienceYears?: number;
    patientsCount?: string;
    isActive?: boolean;
}
