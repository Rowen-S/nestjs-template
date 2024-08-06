import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SKIP_RESPONSE_INTERCEPTOR } from './skip-response-interceptor.decorator';

export interface Response<T> {
  data: T;
  statusCode: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const shouldSkip = this.reflector.get<boolean>(
      SKIP_RESPONSE_INTERCEPTOR,
      context.getHandler(),
    );
    if (shouldSkip) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
      })),
    );
  }
}
