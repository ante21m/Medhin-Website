export declare class CreateLeadershipDto {
    name: string;
    nameAm?: string;
    role: string;
    roleAm?: string;
    bio?: string;
    image?: string;
    experience?: string;
    certificates?: string[];
    awards?: string[];
    order?: number;
}
export declare class UpdateLeadershipDto {
    name?: string;
    nameAm?: string;
    role?: string;
    roleAm?: string;
    bio?: string;
    image?: string;
    experience?: string;
    certificates?: string[];
    awards?: string[];
    order?: number;
    isActive?: boolean;
}
