import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly logger: winston.Logger;
  private readonly activeLevels: Set<string>;

  constructor(context: string, levels?: LogLevel[]) {
    super(context);

    const logLevels = {
      levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        verbose: 5,
      },
      colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        verbose: 'magenta',
      },
    };

    winston.addColors(logLevels.colors);

    this.activeLevels = new Set(this.mapLogLevel(levels));

    this.logger = winston.createLogger({
      levels: logLevels.levels,
      level:
        this.activeLevels.size > 0
          ? Array.from(this.activeLevels)[0]
          : 'verbose', // 默认级别为最高级别
      format: this.getLogFormat(),
      transports: [new winston.transports.Console()],
    });
  }

  private mapLogLevel(levels?: LogLevel[]): string[] {
    const logLevelMap: { [key in LogLevel]: string } = {
      log: 'info',
      error: 'error',
      warn: 'warn',
      debug: 'debug',
      verbose: 'verbose',
      fatal: 'fatal',
    };

    if (!levels || levels.length === 0) {
      // 默认启用所有级别
      return Object.values(logLevelMap);
    }

    // 启用传递的级别
    return levels.map((level) => logLevelMap[level] || 'info');
  }

  private getLogFormat() {
    return winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        return JSON.stringify({
          dateTime: timestamp,
          level,
          msg: message,
          ...meta,
        });
      }),
      winston.format.colorize({ all: true }),
    );
  }

  log(message: string, context?: string) {
    if (this.shouldLog('info')) {
      this.logger.log('info', message, { context: context || this.context });
    }
  }

  error(message: string, trace?: string, context?: string) {
    if (this.shouldLog('error')) {
      this.logger.log('error', message, {
        trace,
        context: context || this.context,
      });
    }
  }

  warn(message: string, context?: string) {
    if (this.shouldLog('warn')) {
      this.logger.log('warn', message, { context: context || this.context });
    }
  }

  debug(message: string, context?: string) {
    if (this.shouldLog('debug')) {
      this.logger.log('debug', message, { context: context || this.context });
    }
  }

  verbose(message: string, context?: string) {
    if (this.shouldLog('verbose')) {
      this.logger.log('verbose', message, { context: context || this.context });
    }
  }

  fatal(message: string, context?: string) {
    if (this.shouldLog('fatal')) {
      this.logger.log('fatal', message, { context: context || this.context });
    }
  }

  private shouldLog(level: string): boolean {
    return this.activeLevels.has(level);
  }
}
