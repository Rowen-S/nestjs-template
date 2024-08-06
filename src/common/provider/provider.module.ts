import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonRpcProvider, Provider } from 'ethers';
import { createPublicClient, http } from 'viem';
import { mantle, mantleSepoliaTestnet } from 'viem/chains';

@Global()
@Module({
  providers: [
    {
      provide: 'ETHERS_RPC_PROVIDER',
      useFactory: (configService: ConfigService) => {
        let rpcUrl = configService.get<string>('RPC_URL');
        const chainEnv = configService.get<string>('CHAIN_ENV');
        const chain = chainEnv === 'testnet' ? mantleSepoliaTestnet : mantle;
        if (!rpcUrl) {
          rpcUrl = chain.blockExplorers.default.url;
        }
        return new JsonRpcProvider(rpcUrl) as Provider;
      },
      inject: [ConfigService],
    },
    {
      provide: 'VIEM_RPC_PROVIDER',
      useFactory: (configService: ConfigService) => {
        let rpcUrl = configService.get<string>('RPC_URL');
        const chainEnv = configService.get<string>('CHAIN_ENV');
        const chain = chainEnv === 'testnet' ? mantleSepoliaTestnet : mantle;
        if (!rpcUrl) {
          rpcUrl = chain.blockExplorers.default.url;
        }
        return createPublicClient({
          chain,
          transport: http(rpcUrl),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['VIEM_RPC_PROVIDER', 'ETHERS_RPC_PROVIDER'],
})
export class ProviderModule {}
