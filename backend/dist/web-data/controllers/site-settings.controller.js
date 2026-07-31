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
exports.SiteSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const site_settings_service_1 = require("../services/site-settings.service");
const site_settings_dto_1 = require("../dtos/site-settings.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let SiteSettingsController = class SiteSettingsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findAllAdmin() {
        return this.service.findAllAdmin();
    }
    findByGroup(group) {
        return this.service.findByGroup(group);
    }
    get(key) {
        return this.service.get(key);
    }
    getMany(keys) {
        return this.service.getMany(keys.split(','));
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(key, dto) {
        return this.service.update(key, dto);
    }
    remove(key) {
        return this.service.remove(key);
    }
    seed() {
        return this.service.seed();
    }
};
exports.SiteSettingsController = SiteSettingsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active settings (public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all settings including inactive (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('group/:group'),
    (0, swagger_1.ApiOperation)({ summary: 'Get settings by group' }),
    __param(0, (0, common_1.Param)('group')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "findByGroup", null);
__decorate([
    (0, common_1.Get)('key/:key'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single setting by key' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('batch'),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple settings by keys (comma-separated)' }),
    (0, swagger_1.ApiQuery)({ name: 'keys', example: 'home_stats_experience,home_partners' }),
    __param(0, (0, common_1.Query)('keys')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "getMany", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create setting (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [site_settings_dto_1.CreateSiteSettingDto]),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':key'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update setting by key (admin)' }),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, site_settings_dto_1.UpdateSiteSettingDto]),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':key'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete setting by key (admin)' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed default settings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "seed", null);
exports.SiteSettingsController = SiteSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Site Settings'),
    (0, common_1.Controller)('site-settings'),
    __metadata("design:paramtypes", [site_settings_service_1.SiteSettingsService])
], SiteSettingsController);
//# sourceMappingURL=site-settings.controller.js.map