import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponse } from '../interface';
import { map, Observable } from 'rxjs';
import { ResponseService } from '../services';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(map((data) => ResponseService.success(data)));
  }
}
