import { LeadershipService } from '../services/leadership.service';
import { CreateLeadershipDto, UpdateLeadershipDto } from '../dtos/leadership.dto';
export declare class LeadershipController {
    private readonly service;
    constructor(service: LeadershipService);
    findAll(): Promise<import("../entities/leadership.entity").Leadership[]>;
    findAllAdmin(): Promise<import("../entities/leadership.entity").Leadership[]>;
    findOne(id: string): Promise<import("../entities/leadership.entity").Leadership>;
    create(dto: CreateLeadershipDto): Promise<import("../entities/leadership.entity").Leadership>;
    update(id: string, dto: UpdateLeadershipDto): Promise<import("../entities/leadership.entity").Leadership>;
    remove(id: string): Promise<void>;
    seed(): Promise<import("../entities/leadership.entity").Leadership[]>;
}
