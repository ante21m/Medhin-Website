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
exports.VacancyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vacancy_service_1 = require("../services/vacancy.service");
const vacancy_dto_1 = require("../dtos/vacancy.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let VacancyController = class VacancyController {
    vacancyService;
    constructor(vacancyService) {
        this.vacancyService = vacancyService;
    }
    findAll() {
        return this.vacancyService.findAll();
    }
    findAllAdmin() {
        return this.vacancyService.findAllAdmin();
    }
    findOne(id) {
        return this.vacancyService.findOne(+id);
    }
    create(dto) {
        return this.vacancyService.create(dto);
    }
    update(id, dto) {
        return this.vacancyService.update(+id, dto);
    }
    remove(id) {
        return this.vacancyService.remove(+id);
    }
};
exports.VacancyController = VacancyController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active vacancies (public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vacancies including inactive (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vacancy by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create vacancy (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vacancy_dto_1.CreateVacancyDto]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update vacancy (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vacancy_dto_1.UpdateVacancyDto]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete vacancy (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "remove", null);
exports.VacancyController = VacancyController = __decorate([
    (0, swagger_1.ApiTags)('Vacancies'),
    (0, common_1.Controller)('vacancies'),
    __metadata("design:paramtypes", [vacancy_service_1.VacancyService])
], VacancyController);
//# sourceMappingURL=vacancy.controller.js.map