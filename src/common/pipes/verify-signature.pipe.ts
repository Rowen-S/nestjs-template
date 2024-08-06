// src/common/pipes/verify-signature.pipe.ts
import {
  Inject,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { PublicClient } from 'viem';

import { AddressValidationPipe } from './address-validation.pipe';

@Injectable()
export class VerifySignaturePipe implements PipeTransform {
  private addressValidationPipe = new AddressValidationPipe();
  constructor(
    @Inject('VIEM_RPC_PROVIDER')
    private readonly client: PublicClient,
  ) {}
  async transform(value: {
    userAddress: string;
    message: string;
    signature: string;
  }) {
    const { userAddress, message, signature } = value;
    const validatedAddress = this.addressValidationPipe.transform(userAddress);

    const isValidMessage = this.validateMessageContent(
      message,
      validatedAddress,
    );
    if (!isValidMessage) {
      throw new UnauthorizedException('Invalid message content');
    }

    const isVerified = await this.client.verifyMessage({
      address: validatedAddress as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });

    if (!isVerified) {
      throw new UnauthorizedException('Invalid signature');
    }

    return value;
  }

  validateMessageContent(message: string, userAddress: string): boolean {
    /**
     * Welcome to xxx!
     *
     * Click to sign and authorize the xxxx.
     *
     * Wallet address:
     * 0x0000000000000000000000000000000000000000
     *
     * Timestamp:
     * 1653257200000
     *
     * By signing this message, you agree to the xxxx Terms of Service (https://xxxx.io/tos) and Privacy Policy (https://xxxx.io/privacy).
     */
    const messageRegex = new RegExp(
      `^Welcome to xxx!\n\nClick to sign and authorize the xxxx.\n\nWallet address:\n${userAddress}\n\nTimestamp:\n(\\d+)\n\nBy signing this message, you agree to the xxxx Terms of Service \\(https:\/\/xxxx.io\/tos\\) and Privacy Policy \\(https:\/\/xxxx.io\/privacy\\).$`,
    );

    const match = message.match(messageRegex);

    if (!match) {
      return false;
    }

    const timestamp = match[2]; // 提取时间戳

    // 验证时间戳是否在合理的时间范围内（如1分钟内）
    const now = Date.now();
    const messageTimestamp = parseInt(timestamp, 10);
    const timeDifference = Math.abs(now - messageTimestamp);

    if (isNaN(messageTimestamp) || timeDifference > 1 * 60 * 1000) {
      return false;
    }

    return true;
  }
}
