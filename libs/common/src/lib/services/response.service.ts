import { ApiResponse } from "../interface";

export class ResponseService {
  static success<T>(
    data: T,
    message = 'Success',
    status = 200
  ): ApiResponse<T> {
    return {
      status,
      message,
      data,
    };
  }

  static error(status = 400, errorCode = 'GENERIC_ERROR', message: string, ): ApiResponse<null> {
    return {
        status,
        errorCode,
        message,
    }
  }
}
