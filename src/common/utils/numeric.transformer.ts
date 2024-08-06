import { ValueTransformer } from 'typeorm';

export class NumericTransformer implements ValueTransformer {
  to(value: number | string): string {
    return value.toString();
  }

  from(value: string): number {
    return parseFloat(value);
  }
}
