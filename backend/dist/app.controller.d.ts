import { DataSource } from 'typeorm';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private dataSource;
    constructor(appService: AppService, dataSource: DataSource);
    getHello(): string;
    health(): Promise<{
        status: string;
        database: string;
    }>;
}
