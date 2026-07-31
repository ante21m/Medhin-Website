import { Repository } from 'typeorm';
import { Leadership } from '../entities/leadership.entity';
import { CreateLeadershipDto, UpdateLeadershipDto } from '../dtos/leadership.dto';
export declare class LeadershipService {
    private repo;
    constructor(repo: Repository<Leadership>);
    findAll(): Promise<Leadership[]>;
    findAllAdmin(): Promise<Leadership[]>;
    findOne(id: number): Promise<Leadership>;
    create(dto: CreateLeadershipDto): Promise<Leadership>;
    update(id: number, dto: UpdateLeadershipDto): Promise<Leadership>;
    remove(id: number): Promise<void>;
    seed(): Promise<Leadership[]>;
}
