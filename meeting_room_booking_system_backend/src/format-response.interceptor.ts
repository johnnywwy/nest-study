import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  /**
   * 拦截器方法，用于拦截HTTP请求并处理响应结果
   *
   * @param context 上下文对象，包含请求和响应等信息
   * @param next 调用处理器，用于执行后续处理
   * @returns Observable对象，包含处理后的响应结果
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        return {
          code: response.statusCode,
          message: 'success',
          data,
        };
      }),
    );
  }
}
