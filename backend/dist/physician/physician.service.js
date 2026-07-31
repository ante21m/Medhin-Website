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
exports.PhysicianService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const physician_entity_1 = require("./physician.entity");
const seed_data_1 = require("./seed-data");
let PhysicianService = class PhysicianService {
    physicianRepository;
    constructor(physicianRepository) {
        this.physicianRepository = physicianRepository;
    }
    findAll() {
        return this.physicianRepository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
    }
    findAllAdmin() {
        return this.physicianRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const physician = await this.physicianRepository.findOne({ where: { id } });
        if (!physician)
            throw new common_1.NotFoundException('Physician not found');
        return physician;
    }
    create(dto) {
        const physician = this.physicianRepository.create(dto);
        return this.physicianRepository.save(physician);
    }
    async update(id, dto) {
        const physician = await this.findOne(id);
        Object.assign(physician, dto);
        return this.physicianRepository.save(physician);
    }
    async remove(id) {
        const physician = await this.findOne(id);
        await this.physicianRepository.remove(physician);
    }
    async seed() {
        const physicians = this.physicianRepository.create(seed_data_1.seedPhysicians);
        return this.physicianRepository.save(physicians);
    }
};
exports.PhysicianService = PhysicianService;
exports.PhysicianService = PhysicianService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(physician_entity_1.Physician)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhysicianService);
//# sourceMappingURL=physician.service.js.map