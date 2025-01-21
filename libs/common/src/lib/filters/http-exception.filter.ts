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
  errorCode?: string;
} | string;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //Extract message and error code from exception
    let message = 'Internal server error';
    let errorCode = 'GENERIC_ERROR';

    if(exception instanceof HttpException) {
        const exceptionResponse: ExceptionResponse = exception.getResponse();

        if(typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object') {
            message = exceptionResponse?.message || message;
            errorCode = exceptionResponse?.errorCode || errorCode;
        }
    }

    response
      .status(status)
      .json(ResponseService.error(status, errorCode, message));
  }
}
