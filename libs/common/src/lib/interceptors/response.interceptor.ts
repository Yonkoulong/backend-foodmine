import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponse } from '../interface';
import { map, Observable } from 'rxjs';
import { ResponseService } from '../services';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ApiResponse<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();

    const statusCode = response.statusCode; //Get HTTP status code
    const messageDefault = 'Successfully';

    return next.handle().pipe(
      map((data) => ResponseService.success(statusCode, messageDefault, data)));
  }
}
