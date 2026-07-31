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
exports.UpdateSiteSettingDto = exports.CreateSiteSettingDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateSiteSettingDto {
    key;
    value;
    group;
}
exports.CreateSiteSettingDto = CreateSiteSettingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'home_stats_experience', description: 'Unique setting key' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25+', description: 'Setting value (JSON string for arrays/objects)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'home', description: 'Setting group' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "group", void 0);
class UpdateSiteSettingDto {
    value;
    group;
    isActive;
}
exports.UpdateSiteSettingDto = UpdateSiteSettingDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Setting value' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Setting group' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingDto.prototype, "group", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Active status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], UpdateSiteSettingDto.prototype, "isActive", void 0);
//# sourceMappingURL=site-settings.dto.js.map