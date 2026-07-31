import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Physician } from '../../physician/physician.entity';
import { Department } from '../entities/department.entity';
import { Service } from '../entities/service.entity';
import { Gallery } from '../entities/gallery.entity';
import { News } from '../../news/news.entity';
import { Vacancy } from '../entities/vacancy.entity';
import { Report } from '../entities/report.entity';
import { Social } from '../entities/social.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async getStats() {
    const entities: { key: string; entity: any; hasActive: boolean }[] = [
      { key: 'physicians', entity: Physician, hasActive: true },
      { key: 'departments', entity: Department, hasActive: true },
      { key: 'services', entity: Service, hasActive: true },
      { key: 'news', entity: News, hasActive: true },
      { key: 'vacancies', entity: Vacancy, hasActive: true },
      { key: 'gallery', entity: Gallery, hasActive: false },
      { key: 'reports', entity: Report, hasActive: true },
      { key: 'social', entity: Social, hasActive: false },
    ];

    const counts: Record<string, { total: number; active: number; inactive: number }> = {};

    for (const { key, entity, hasActive } of entities) {
      const total = await this.entityManager.count(entity);
      let active = total;
      if (hasActive) {
        try { active = await this.entityManager.count(entity, { where: { isActive: true } }); } catch { active = total; }
      }
      counts[key] = { total, active, inactive: total - active };
    }

    const totalItems = Object.values(counts).reduce((s, c) => s + c.total, 0);
    const activeItems = Object.values(counts).reduce((s, c) => s + c.active, 0);

    return { counts, totals: { total: totalItems, active: activeItems, inactive: totalItems - activeItems } };
  }
}
