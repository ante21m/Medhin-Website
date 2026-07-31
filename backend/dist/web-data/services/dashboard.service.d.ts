import { EntityManager } from 'typeorm';
export declare class DashboardService {
    private entityManager;
    constructor(entityManager: EntityManager);
    getStats(): Promise<{
        counts: Record<string, {
            total: number;
            active: number;
            inactive: number;
        }>;
        totals: {
            total: number;
            active: number;
            inactive: number;
        };
    }>;
}
