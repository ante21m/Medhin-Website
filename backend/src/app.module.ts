import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { WebDataModule } from './web-data/web-data.module';
import { PhysicianModule } from './physician/physician.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'web_business',
      autoLoadEntities: true,
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true' ? ['error', 'warn', 'query'] : ['error', 'warn'],
    }),
    AuthModule,
    NewsModule,
    WebDataModule,
    PhysicianModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
