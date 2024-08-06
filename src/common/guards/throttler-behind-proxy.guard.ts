import { Injectable, Logger } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  private readonly logger = new Logger(ThrottlerBehindProxyGuard.name);
  protected async getTracker(req: Record<string, any>): Promise<string> {
    this.logger.debug(`IP Addresses: ips: ${req.ips}, ip: ${req.ip}`);
    return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  }
}
