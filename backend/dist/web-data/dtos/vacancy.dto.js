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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVacancyDto = exports.CreateVacancyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateVacancyDto {
    title;
    description;
    requirements;
    location;
    deadline;
}
exports.CreateVacancyDto = CreateVacancyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Software Engineer', description: 'Job title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'We are looking for...',
        description: 'Job description',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '- 3+ years experience\n- TypeScript',
        description: 'Job requirements',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'New York, NY', description: 'Job location' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-06-30',
        description: 'Application deadline',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "deadline", void 0);
class UpdateVacancyDto {
    title;
    description;
    requirements;
    location;
    deadline;
    isActive;
}
exports.UpdateVacancyDto = UpdateVacancyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Job title' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Job description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Job requirements' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Job location' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Application deadline' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Active status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], UpdateVacancyDto.prototype, "isActive", void 0);
//# sourceMappingURL=vacancy.dto.js.map