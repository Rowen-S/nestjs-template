import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.fatal('Hello World!', 'test');
    return 'Hello World!';
  }
}
