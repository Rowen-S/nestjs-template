import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

interface ErrorResponse {
  message: string;
  statusCode: number;
  errors?: any;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    let errors: any;

    if (exception instanceof BadRequestException) {
      const badRequestResponse = exception.getResponse() as any;
      if (Array.isArray(badRequestResponse.message)) {
        message = 'Validation failed';
        errors = badRequestResponse.message.map((error: ValidationError) => ({
          property: error.property,
          constraints: error.constraints,
          children: error.children,
        }));
      } else {
        message = badRequestResponse.message || 'Bad request';
        errors = badRequestResponse.error || null;
      }
    } else if (exception instanceof HttpException) {
      const httpResponse = exception.getResponse() as any;
      message =
        typeof httpResponse === 'string'
          ? httpResponse
          : httpResponse.message || 'Http Exception';
      errors = httpResponse.error || null;
    } else if (exception instanceof Error) {
      message = exception.message;
      errors = null;
    } else {
      message = 'Internal server error';
      errors = null;
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
    };

    if (errors !== null && errors !== undefined) {
      errorResponse.errors = errors;
    }

    response.status(status).json(errorResponse);
  }
}
