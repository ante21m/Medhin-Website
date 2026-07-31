import { SiteSettingsService } from '../services/site-settings.service';
import { CreateSiteSettingDto, UpdateSiteSettingDto } from '../dtos/site-settings.dto';
export declare class SiteSettingsController {
    private readonly service;
    constructor(service: SiteSettingsService);
    findAll(): Promise<import("../entities/site-settings.entity").SiteSetting[]>;
    findAllAdmin(): Promise<import("../entities/site-settings.entity").SiteSetting[]>;
    findByGroup(group: string): Promise<import("../entities/site-settings.entity").SiteSetting[]>;
    get(key: string): Promise<import("../entities/site-settings.entity").SiteSetting | null>;
    getMany(keys: string): Promise<Record<string, string>>;
    create(dto: CreateSiteSettingDto): Promise<import("../entities/site-settings.entity").SiteSetting>;
    update(key: string, dto: UpdateSiteSettingDto): Promise<import("../entities/site-settings.entity").SiteSetting>;
    remove(key: string): Promise<void>;
    seed(): Promise<import("../entities/site-settings.entity").SiteSetting[]>;
}
