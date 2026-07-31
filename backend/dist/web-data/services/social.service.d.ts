import { Repository } from 'typeorm';
import { Social } from '../entities/social.entity';
import { CreateSocialDto, UpdateSocialDto } from '../dtos/social.dto';
export declare class SocialService {
    private socialRepository;
    constructor(socialRepository: Repository<Social>);
    findAll(): Promise<Social[]>;
    findOne(id: number): Promise<Social>;
    create(dto: CreateSocialDto): Promise<Social>;
    update(id: number, dto: UpdateSocialDto): Promise<Social>;
    remove(id: number): Promise<void>;
}
