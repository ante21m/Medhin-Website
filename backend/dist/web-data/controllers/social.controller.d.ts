import { SocialService } from '../services/social.service';
import { CreateSocialDto, UpdateSocialDto } from '../dtos/social.dto';
export declare class SocialController {
    private readonly socialService;
    constructor(socialService: SocialService);
    findAll(): Promise<import("../entities/social.entity").Social[]>;
    findOne(id: string): Promise<import("../entities/social.entity").Social>;
    create(dto: CreateSocialDto): Promise<import("../entities/social.entity").Social>;
    update(id: string, dto: UpdateSocialDto): Promise<import("../entities/social.entity").Social>;
    remove(id: string): Promise<void>;
}
