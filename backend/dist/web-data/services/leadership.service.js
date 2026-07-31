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
exports.LeadershipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leadership_entity_1 = require("../entities/leadership.entity");
const seedData = [
    {
        name: 'Dr. Kassaw Alemayehu',
        nameAm: 'ዶ/ር ቃሳው አለማየሁ',
        role: 'CEO & Medical Director',
        roleAm: 'ስልጣኔ ኃላፊ እና የሕክምና መሪ',
        bio: 'Dr. Kassaw brings over 20 years of leadership experience in healthcare administration and clinical practice.',
        image: '/leadership/dr-kassaw.jpg',
        experience: '20+ Years',
        certificates: ['MD - Addis Ababa University', 'MBA in Healthcare Management'],
        awards: ['Healthcare Leadership Award 2023'],
        order: 1,
    },
    {
        name: 'Dr. Hana Tesfaye',
        nameAm: 'ዶ/ር ሀና ተስፋዬ',
        role: 'Chief of Medical Services',
        roleAm: 'የሕክምና አገልግሎት ዋና ኃላፊ',
        bio: 'Dr. Hana oversees all clinical operations and ensures the highest standards of patient care.',
        image: '/leadership/dr-hana.jpg',
        experience: '15+ Years',
        certificates: ['MD - Jimma University', 'Specialty in Internal Medicine'],
        awards: ['Excellence in Patient Care 2022'],
        order: 2,
    },
    {
        name: 'Samuel Bekele',
        nameAm: 'ሳሙኤል በቀለ',
        role: 'Chief Operations Officer',
        roleAm: 'የስራ ኃላፊ',
        bio: 'Samuel manages hospital operations, ensuring efficient service delivery and resource management.',
        image: '/leadership/samuel-bekele.jpg',
        experience: '12+ Years',
        certificates: ['BSc in Health Administration', 'MPH - Ethiopian Civil Service University'],
        awards: [],
        order: 3,
    },
];
let LeadershipService = class LeadershipService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ where: { isActive: true }, order: { order: 'ASC' } });
    }
    findAllAdmin() {
        return this.repo.find({ order: { order: 'ASC' } });
    }
    async findOne(id) {
        const item = await this.repo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Leadership not found');
        return item;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        const item = await this.findOne(id);
        Object.assign(item, dto);
        return this.repo.save(item);
    }
    async remove(id) {
        const item = await this.findOne(id);
        await this.repo.remove(item);
    }
    async seed() {
        const count = await this.repo.count();
        if (count > 0)
            return this.repo.find();
        return this.repo.save(this.repo.create(seedData));
    }
};
exports.LeadershipService = LeadershipService;
exports.LeadershipService = LeadershipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leadership_entity_1.Leadership)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeadershipService);
//# sourceMappingURL=leadership.service.js.map