import { DashboardService } from '../services/dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
