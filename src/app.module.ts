import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import configuration from './config/app.config';
import { TimeoutInterceptor } from './commont/timeout.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DB.DIALECT'),
        host: configService.get('DB.HOST'),
        port: configService.get('DB.PORT'),
        username: configService.get('DB.USERNAME'),
        password: configService.get('DB.PASSWORD'),
        database: configService.get('DB.DATABASE'),
        autoLoadModels: configService.get('DB.AUTOLOADMODELS'),
        synchronize: configService.get('DB.SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    ConfigService,
  ],
})
export class AppModule {}
