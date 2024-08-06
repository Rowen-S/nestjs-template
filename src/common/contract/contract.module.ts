// src/common/contract/contract.module.ts

import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { ContractService } from './contract.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
