"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const physician_entity_1 = require("../../physician/physician.entity");
const department_entity_1 = require("../entities/department.entity");
const service_entity_1 = require("../entities/service.entity");
const gallery_entity_1 = require("../entities/gallery.entity");
const news_entity_1 = require("../../news/news.entity");
const vacancy_entity_1 = require("../entities/vacancy.entity");
const report_entity_1 = require("../entities/report.entity");
const social_entity_1 = require("../entities/social.entity");
let DashboardService = class DashboardService {
    entityManager;
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async getStats() {
        const entities = [
            { key: 'physicians', entity: physician_entity_1.Physician, hasActive: true },
            { key: 'departments', entity: department_entity_1.Department, hasActive: true },
            { key: 'services', entity: service_entity_1.Service, hasActive: true },
            { key: 'news', entity: news_entity_1.News, hasActive: true },
            { key: 'vacancies', entity: vacancy_entity_1.Vacancy, hasActive: true },
            { key: 'gallery', entity: gallery_entity_1.Gallery, hasActive: false },
            { key: 'reports', entity: report_entity_1.Report, hasActive: true },
            { key: 'social', entity: social_entity_1.Social, hasActive: false },
        ];
        const counts = {};
        for (const { key, entity, hasActive } of entities) {
            const total = await this.entityManager.count(entity);
            let active = total;
            if (hasActive) {
                try {
                    active = await this.entityManager.count(entity, { where: { isActive: true } });
                }
                catch {
                    active = total;
                }
            }
            counts[key] = { total, active, inactive: total - active };
        }
        const totalItems = Object.values(counts).reduce((s, c) => s + c.total, 0);
        const activeItems = Object.values(counts).reduce((s, c) => s + c.active, 0);
        return { counts, totals: { total: totalItems, active: activeItems, inactive: totalItems - activeItems } };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map