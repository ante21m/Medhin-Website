export declare class CreateFaqDto {
    question: string;
    questionAm?: string;
    answer: string;
    answerAm?: string;
    category?: string;
    order?: number;
}
export declare class UpdateFaqDto {
    question?: string;
    questionAm?: string;
    answer?: string;
    answerAm?: string;
    category?: string;
    order?: number;
    isActive?: boolean;
}
