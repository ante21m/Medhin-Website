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
    ConfigModule.forRoot({		
	 envFilePath: '.env',
    isGlobal: true
	}
	),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST ,
      port: Number(process.env.DATABASE_PORT) ,
      username: process.env.DATABASE_USER ,
      password: process.env.DATABASE_PASSWORD ,
      database: process.env.DATABASE_NAME ,
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
