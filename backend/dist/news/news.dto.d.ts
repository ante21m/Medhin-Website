export declare class CreateNewsDto {
    title: string;
    content: string;
    summary?: string;
    image?: string;
    author?: string;
}
export declare class UpdateNewsDto {
    title?: string;
    content?: string;
    summary?: string;
    image?: string;
    author?: string;
    isActive?: boolean;
}
