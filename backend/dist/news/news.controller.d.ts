import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    findAll(): Promise<import("./news.entity").News[]>;
    findAllAdmin(): Promise<import("./news.entity").News[]>;
    findOne(id: string): Promise<import("./news.entity").News>;
    create(dto: CreateNewsDto): Promise<import("./news.entity").News>;
    update(id: string, dto: UpdateNewsDto): Promise<import("./news.entity").News>;
    remove(id: string): Promise<void>;
}
