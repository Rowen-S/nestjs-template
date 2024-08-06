import { ValueTransformer } from 'typeorm';

export class BigIntTransformer implements ValueTransformer {
  to(value: number | string): string {
    return value.toString();
  }

  from(value: string): number {
    return Number(value);
  }
}
