// src/common/pipes/address-validation.pipe.ts
import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { getAddress } from 'ethers';

@Injectable()
export class AddressValidationPipe implements PipeTransform<string, string> {
  private readonly logger = new Logger(AddressValidationPipe.name);
  transform(value: string): string {
    try {
      return getAddress(value);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid address format');
    }
  }
}
