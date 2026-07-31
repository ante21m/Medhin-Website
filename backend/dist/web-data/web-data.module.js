"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebDataModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const department_entity_1 = require("./entities/department.entity");
const gallery_entity_1 = require("./entities/gallery.entity");
const report_entity_1 = require("./entities/report.entity");
const social_entity_1 = require("./entities/social.entity");
const vacancy_entity_1 = require("./entities/vacancy.entity");
const service_entity_1 = require("./entities/service.entity");
const site_settings_entity_1 = require("./entities/site-settings.entity");
const leadership_entity_1 = require("./entities/leadership.entity");
const faq_entity_1 = require("./entities/faq.entity");
const appointment_entity_1 = require("./entities/appointment.entity");
const department_service_1 = require("./services/department.service");
const gallery_service_1 = require("./services/gallery.service");
const report_service_1 = require("./services/report.service");
const social_service_1 = require("./services/social.service");
const vacancy_service_1 = require("./services/vacancy.service");
const service_service_1 = require("./services/service.service");
const dashboard_service_1 = require("./services/dashboard.service");
const site_settings_service_1 = require("./services/site-settings.service");
const leadership_service_1 = require("./services/leadership.service");
const faq_service_1 = require("./services/faq.service");
const appointment_service_1 = require("./services/appointment.service");
const department_controller_1 = require("./controllers/department.controller");
const gallery_controller_1 = require("./controllers/gallery.controller");
const report_controller_1 = require("./controllers/report.controller");
const social_controller_1 = require("./controllers/social.controller");
const vacancy_controller_1 = require("./controllers/vacancy.controller");
const service_controller_1 = require("./controllers/service.controller");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const site_settings_controller_1 = require("./controllers/site-settings.controller");
const leadership_controller_1 = require("./controllers/leadership.controller");
const faq_controller_1 = require("./controllers/faq.controller");
const appointment_controller_1 = require("./controllers/appointment.controller");
let WebDataModule = class WebDataModule {
};
exports.WebDataModule = WebDataModule;
exports.WebDataModule = WebDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                department_entity_1.Department, gallery_entity_1.Gallery, report_entity_1.Report, social_entity_1.Social, vacancy_entity_1.Vacancy, service_entity_1.Service,
                site_settings_entity_1.SiteSetting, leadership_entity_1.Leadership, faq_entity_1.Faq, appointment_entity_1.Appointment,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [
            department_controller_1.DepartmentController, gallery_controller_1.GalleryController, report_controller_1.ReportController,
            social_controller_1.SocialController, vacancy_controller_1.VacancyController, service_controller_1.ServiceController,
            dashboard_controller_1.DashboardController, site_settings_controller_1.SiteSettingsController, leadership_controller_1.LeadershipController,
            faq_controller_1.FaqController,
            appointment_controller_1.AppointmentController,
        ],
        providers: [
            department_service_1.DepartmentService, gallery_service_1.GalleryService, report_service_1.ReportService,
            social_service_1.SocialService, vacancy_service_1.VacancyService, service_service_1.ServiceService,
            dashboard_service_1.DashboardService, site_settings_service_1.SiteSettingsService, leadership_service_1.LeadershipService,
            faq_service_1.FaqService,
            appointment_service_1.AppointmentService,
        ],
    })
], WebDataModule);
//# sourceMappingURL=web-data.module.js.map