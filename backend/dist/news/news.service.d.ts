import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
export declare class NewsService {
    private newsRepository;
    constructor(newsRepository: Repository<News>);
    findAll(): Promise<News[]>;
    findAllAdmin(): Promise<News[]>;
    findOne(id: number): Promise<News>;
    create(dto: CreateNewsDto): Promise<News>;
    update(id: number, dto: UpdateNewsDto): Promise<News>;
    remove(id: number): Promise<void>;
}
