import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseService } from '../services/response.service';
import { Response } from 'express';

type ExceptionResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
} | string;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | string[] = 'An unexpected error occurred';
        
    if(exception instanceof HttpException) {
      const exceptionResponse: ExceptionResponse = exception.getResponse();
      statusCode = exception.getStatus();

        if(typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object') {
            message = exceptionResponse?.message || message;
            error = exceptionResponse?.error || error;
        }
    }

    response
      .status(statusCode)
      .json(ResponseService.error(message, error, statusCode));
  }
}
