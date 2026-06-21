import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { refreshExpiersTime } from '../auth/auth.service';

@Injectable()
export class AuthCookieInterceptor
  implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
  ) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const shouldSetCookie = this.reflector.get<boolean>('SET_AUTH_COOKIE', context.getHandler());

    if (!shouldSetCookie) {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data.refreshToken) {
          response.cookie(
            'refreshToken',
            data.refreshToken,
            {
              httpOnly: true,
              secure:
                process.env.NODE_ENV ===
                'production',
              sameSite: 'lax',
              maxAge:
                refreshExpiersTime *
                24 *
                60 *
                60 *
                1000,
            },
          );

          delete data.refreshToken;
        }

        return data;
      }),
    );
  }
}