import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Wraps every successful handler return value in the shared `ApiResponse`
 * envelope `{ data, success, message? }` expected by `@suite/sdk`.
 *
 * If a handler returns an object containing a top-level `message`, it is
 * lifted onto the envelope rather than nested inside `data`.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((payload): ApiResponse<T> => {
        if (
          payload &&
          typeof payload === 'object' &&
          'message' in payload &&
          Object.keys(payload as object).length === 1
        ) {
          const { message } = payload as { message?: string };
          return { data: null as T, message, success: true };
        }
        return { data: payload, success: true };
      }),
    );
  }
}
