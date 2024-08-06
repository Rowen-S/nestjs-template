import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipResponseInterceptor } from '@/common/interceptors/skip-response-interceptor.decorator';

import { MetricsService } from './metrics.service';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  @SkipResponseInterceptor()
  async getMetrics(): Promise<string> {
    return this.metricsService.collect();
  }
}
