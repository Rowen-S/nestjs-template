import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Counter, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: Registry;
  public readonly testCounter: Counter<string>;

  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });

    this.testCounter = new Counter({
      name: 'test_tasks_total', // The name of the metric
      help: 'Total number of test tasks', // A description of what the metric represents
      labelNames: ['status'], // Labels to attach to the metric
      registers: [this.registry], // The registry where the metric will be registered
    });
  }

  async collect(): Promise<string> {
    return this.registry.metrics();
  }
}
