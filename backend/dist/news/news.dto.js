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
exports.UpdateNewsDto = exports.CreateNewsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateNewsDto {
    title;
    content;
    summary;
    image;
    author;
}
exports.CreateNewsDto = CreateNewsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Company Announcement', description: 'News title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Full news content here...',
        description: 'News content body',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Short summary of the news',
        description: 'Brief summary',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'uploads/news/image.jpg',
        description: 'Image path',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Admin', description: 'Author name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsDto.prototype, "author", void 0);
class UpdateNewsDto {
    title;
    content;
    summary;
    image;
    author;
    isActive;
}
exports.UpdateNewsDto = UpdateNewsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'News title' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateNewsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'News content body' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateNewsDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brief summary' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateNewsDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Image path' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateNewsDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Author name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateNewsDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Active status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], UpdateNewsDto.prototype, "isActive", void 0);
//# sourceMappingURL=news.dto.js.map