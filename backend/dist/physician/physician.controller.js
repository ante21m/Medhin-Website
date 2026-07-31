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
exports.PhysicianController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const physician_service_1 = require("./physician.service");
const physician_dto_1 = require("./physician.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PhysicianController = class PhysicianController {
    physicianService;
    constructor(physicianService) {
        this.physicianService = physicianService;
    }
    findAll() {
        return this.physicianService.findAll();
    }
    findAllAdmin() {
        return this.physicianService.findAllAdmin();
    }
    findOne(id) {
        return this.physicianService.findOne(+id);
    }
    create(dto) {
        return this.physicianService.create(dto);
    }
    update(id, dto) {
        return this.physicianService.update(+id, dto);
    }
    remove(id) {
        return this.physicianService.remove(+id);
    }
    seed() {
        return this.physicianService.seed();
    }
};
exports.PhysicianController = PhysicianController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active physicians (public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhysicianController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all physicians including inactive (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhysicianController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get physician by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhysicianController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create physician (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [physician_dto_1.CreatePhysicianDto]),
    __metadata("design:returntype", void 0)
], PhysicianController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update physician (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, physician_dto_1.UpdatePhysicianDto]),
    __metadata("design:returntype", void 0)
], PhysicianController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete physician (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhysicianController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed physicians from config (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhysicianController.prototype, "seed", null);
exports.PhysicianController = PhysicianController = __decorate([
    (0, swagger_1.ApiTags)('Physicians'),
    (0, common_1.Controller)('physicians'),
    __metadata("design:paramtypes", [physician_service_1.PhysicianService])
], PhysicianController);
//# sourceMappingURL=physician.controller.js.map