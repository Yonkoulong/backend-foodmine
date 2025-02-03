import { ApiResponse } from '../interface';

export class ResponseService {
  static success<T>(
    statusCode = 200,
    message = 'Success',
    data: T,
  ): ApiResponse<T> {
    return {
      statusCode,
      message,
      data,
    };
  }

  static error(
    message: string,
    error: string,
    statusCode = 400
  ): ApiResponse<null> {
    return {
      message,
      error,
      statusCode,
    };
  }
}
