// src/common/utils/concurrency.ts
import { Logger } from '@nestjs/common';

const logger = new Logger('ConcurrencyLimit');

/**
 * 高阶函数：限制并发执行的任务数量
 * @param limit 最大并发数
 */
export function withConcurrencyLimit(limit: number) {
  let activeCount = 0;
  const queue: (() => Promise<void>)[] = [];

  const next = () => {
    if (queue.length > 0 && activeCount < limit) {
      activeCount++;
      queue.shift()!().finally(() => {
        activeCount--;
        next();
      });
    }
  };

  return <T>(fn: () => Promise<T>): Promise<T> =>
    new Promise((resolve, reject) => {
      queue.push(() => fn().then(resolve, reject));
      next();
    });
}

/**
 * 执行一组任务并限制并发数量
 * @param tasks 任务列表
 * @param limit 最大并发数
 */
export async function withTasksConcurrencyLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const p = task()
      .then((result) => results.push(result))
      .catch((error) => {
        logger.error('Task execution failed', error);
      });

    executing.push(p as any);

    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex((p) => p === Promise.race(executing)),
        1,
      );
    }
  }

  await Promise.all(executing);

  return results;
}
