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
exports.UpdatePhysicianDto = exports.CreatePhysicianDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreatePhysicianDto {
    name;
    nameAm;
    specialty;
    specialtyAm;
    image;
    rating;
    reviews;
    available;
    availabilityText;
    bio;
    experience;
    languages;
    education;
    certifications;
    specialtiesList;
    procedures;
    experienceYears;
    patientsCount;
}
exports.CreatePhysicianDto = CreatePhysicianDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Derneke Kebede', description: 'Physician name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'ዶ/ር ደርነቀ ከበደ', description: 'Amharic name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "nameAm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cardiology', description: 'Specialty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "specialty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'የልብ ህክምና', description: 'Amharic specialty' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "specialtyAm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uploads/physicians/doctor.jpg', description: 'Image path' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 4.5, description: 'Rating' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], CreatePhysicianDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120, description: 'Review count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], CreatePhysicianDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Availability status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], CreatePhysicianDto.prototype, "available", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Available Mon-Fri', description: 'Availability text' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "availabilityText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Experienced cardiologist...', description: 'Bio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '15+ years', description: 'Experience summary' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['English', 'Amharic'], description: 'Languages' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePhysicianDto.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['MD, AAU', 'Fellowship in Cardiology'], description: 'Education' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePhysicianDto.prototype, "education", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['Board Certified', 'ACC Member'], description: 'Certifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePhysicianDto.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['Echocardiography', 'Angioplasty'], description: 'Specialties list' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePhysicianDto.prototype, "specialtiesList", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['Heart Surgery', 'Stent Placement'], description: 'Procedures' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePhysicianDto.prototype, "procedures", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15, description: 'Years of experience' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], CreatePhysicianDto.prototype, "experienceYears", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5000+', description: 'Patients count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicianDto.prototype, "patientsCount", void 0);
class UpdatePhysicianDto {
    name;
    nameAm;
    specialty;
    specialtyAm;
    image;
    rating;
    reviews;
    available;
    availabilityText;
    bio;
    experience;
    languages;
    education;
    certifications;
    specialtiesList;
    procedures;
    experienceYears;
    patientsCount;
    isActive;
}
exports.UpdatePhysicianDto = UpdatePhysicianDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Physician name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Amharic name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "nameAm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Specialty' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "specialty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Amharic specialty' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "specialtyAm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Image path' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Rating' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], UpdatePhysicianDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Review count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], UpdatePhysicianDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Availability status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], UpdatePhysicianDto.prototype, "available", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Availability text' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "availabilityText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Experience summary' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Languages' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdatePhysicianDto.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Education' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdatePhysicianDto.prototype, "education", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Certifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdatePhysicianDto.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Specialties list' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdatePhysicianDto.prototype, "specialtiesList", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Procedures' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdatePhysicianDto.prototype, "procedures", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Years of experience' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], UpdatePhysicianDto.prototype, "experienceYears", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Patients count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePhysicianDto.prototype, "patientsCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Active status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], UpdatePhysicianDto.prototype, "isActive", void 0);
//# sourceMappingURL=physician.dto.js.map