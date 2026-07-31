export declare class CreateFaqDto {
    question: string;
    answer: string;
    category?: string;
    order?: number;
}
export declare class UpdateFaqDto {
    question?: string;
    answer?: string;
    category?: string;
    order?: number;
    isActive?: boolean;
}
