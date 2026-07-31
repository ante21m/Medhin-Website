import { Repository } from 'typeorm';
import { SiteSetting } from '../entities/site-settings.entity';
import { CreateSiteSettingDto, UpdateSiteSettingDto } from '../dtos/site-settings.dto';
export declare class SiteSettingsService {
    private repo;
    constructor(repo: Repository<SiteSetting>);
    findAll(): Promise<SiteSetting[]>;
    findAllAdmin(): Promise<SiteSetting[]>;
    findByGroup(group: string): Promise<SiteSetting[]>;
    get(key: string): Promise<SiteSetting | null>;
    getMany(keys: string[]): Promise<Record<string, string>>;
    create(dto: CreateSiteSettingDto): Promise<SiteSetting>;
    update(key: string, dto: UpdateSiteSettingDto): Promise<SiteSetting>;
    remove(key: string): Promise<void>;
    seed(): Promise<SiteSetting[]>;
}
