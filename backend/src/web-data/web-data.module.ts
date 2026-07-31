import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { Department } from './entities/department.entity';
import { Gallery } from './entities/gallery.entity';
import { Report } from './entities/report.entity';
import { Social } from './entities/social.entity';
import { Vacancy } from './entities/vacancy.entity';
import { Service } from './entities/service.entity';
import { SiteSetting } from './entities/site-settings.entity';
import { Leadership } from './entities/leadership.entity';
import { Faq } from './entities/faq.entity';
import { Appointment } from './entities/appointment.entity';

import { DepartmentService } from './services/department.service';
import { GalleryService } from './services/gallery.service';
import { ReportService } from './services/report.service';
import { SocialService } from './services/social.service';
import { VacancyService } from './services/vacancy.service';
import { ServiceService } from './services/service.service';
import { DashboardService } from './services/dashboard.service';
import { SiteSettingsService } from './services/site-settings.service';
import { LeadershipService } from './services/leadership.service';
import { FaqService } from './services/faq.service';
import { AppointmentService } from './services/appointment.service';

import { DepartmentController } from './controllers/department.controller';
import { GalleryController } from './controllers/gallery.controller';
import { ReportController } from './controllers/report.controller';
import { SocialController } from './controllers/social.controller';
import { VacancyController } from './controllers/vacancy.controller';
import { ServiceController } from './controllers/service.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { SiteSettingsController } from './controllers/site-settings.controller';
import { LeadershipController } from './controllers/leadership.controller';
import { FaqController } from './controllers/faq.controller';
import { AppointmentController } from './controllers/appointment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Department, Gallery, Report, Social, Vacancy, Service,
      SiteSetting, Leadership, Faq, Appointment,
    ]),
    AuthModule,
  ],
  controllers: [
    DepartmentController, GalleryController, ReportController,
    SocialController, VacancyController, ServiceController,
    DashboardController, SiteSettingsController, LeadershipController,
    FaqController,
    AppointmentController,
  ],
  providers: [
    DepartmentService, GalleryService, ReportService,
    SocialService, VacancyService, ServiceService,
    DashboardService, SiteSettingsService, LeadershipService,
    FaqService,
    AppointmentService,
  ],
})
export class WebDataModule {}
