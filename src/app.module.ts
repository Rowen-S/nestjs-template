import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { minutes, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractModule } from './common/contract/contract.module';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { AllExceptionsFilter } from './common/interceptors/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { MetricsModule } from './common/metrics/metrics.module';
import { ProviderModule } from './common/provider/provider.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    // Cache
    CacheModule.register({ isGlobal: true }),
    // Config
    ConfigModule.forRoot({ isGlobal: true }),
    // Throttler
    ThrottlerModule.forRoot([
      {
        ttl: minutes(1),
        limit: 20,
      },
    ]),
    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    MetricsModule,
    ContractModule,
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
