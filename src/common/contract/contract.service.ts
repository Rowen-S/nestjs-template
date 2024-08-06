// src/common/contract/contract.service.ts

import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getAddress, JsonRpcProvider } from 'ethers';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);
  private readonly apiKey: string;
  private readonly etherscanBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly cfg: ConfigService,
    @Inject('ETHERS_RPC_PROVIDER') private readonly provider: JsonRpcProvider,
  ) {
    this.apiKey = this.cfg.get<string>('ETHERSCAN_API_KEY');
    const chainEnv = this.cfg.get<string>('CHAIN_ENV');
    this.etherscanBaseUrl =
      chainEnv === 'testnet'
        ? 'https://api-sepolia.mantlescan.xyz/api'
        : 'https://api.mantlescan.xyz/api';
  }

  async getAbiFromEtherscan(contractAddress: string): Promise<any[]> {
    const url = `${this.etherscanBaseUrl}?module=contract&action=getabi&address=${contractAddress}&apikey=${this.apiKey}`;
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      if (response.data.status === '1') {
        const abi = JSON.parse(response.data.result);
        if (this.isProxy(abi)) {
          const implementationAddress =
            await this.getImplementationAddress(contractAddress);
          return await this.getAbiFromEtherscan(implementationAddress);
          // throw new Error(
          //   `Detected proxy contract at address: ${contractAddress}`,
          // );
        }
        return abi;
      } else {
        this.logger.error(`Failed to fetch ABI: ${response.data.result}`);
        throw new Error(`Failed to fetch ABI: ${response.data.result}`);
      }
    } catch (error) {
      this.logger.error(`Error fetching ABI from Etherscan: ${error.message}`);
      throw error;
    }
  }

  async getContractCreationBlock(contractAddress: string): Promise<number> {
    const url = `${this.etherscanBaseUrl}?module=account&action=txlist&address=${contractAddress}&sort=asc&apikey=${this.apiKey}`;
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      if (response.data.status !== '1') {
        throw new Error(
          `Failed to fetch transactions: ${response.data.result}`,
        );
      }

      const transactions = response.data.result;
      const creationTransaction = transactions.find(
        (tx: any) => tx.to === null || tx.to === '',
      );

      if (!creationTransaction) {
        throw new Error('Creation transaction not found');
      }

      return parseInt(creationTransaction.blockNumber, 10);
    } catch (error) {
      this.logger.error(
        `Error fetching contract creation block: ${error.message}`,
      );
      throw error;
    }
  }

  private isProxy(abi: any[]): boolean {
    const proxyMethodsAndEvents = [
      'admin',
      'upgradeTo',
      'implementation',
      'AdminChanged',
      'Upgraded',
    ];
    return abi.some((item) => proxyMethodsAndEvents.includes(item.name));
  }

  private async getImplementationAddress(
    proxyAddress: string,
  ): Promise<string> {
    const implementationSlot =
      '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
    const storageValue = await this.provider.getStorage(
      proxyAddress,
      implementationSlot,
    );
    const implementationAddress = getAddress(`0x${storageValue.substring(26)}`);
    return implementationAddress;
  }
}
