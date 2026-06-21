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
export class DeleteAuthCookieInterceptor
  implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
  ) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const shouldDeleteCookie = this.reflector.get<boolean>('Delete_AUTH_COOKIE', context.getHandler());

    if (!shouldDeleteCookie) {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map(() => {

        // if(response.cookie())
        // if (data.refreshToken) {
        //   response.cookie(
        //     'refreshToken',
        //     data.refreshToken,
        //     {
        //       httpOnly: true,
        //       secure:
        //         process.env.NODE_ENV ===
        //         'production',
        //       sameSite: 'lax',
        //       maxAge:
        //         refreshExpiersTime *
        //         24 *
        //         60 *
        //         60 *
        //         1000,
        //     },
        //   );

        //   delete data.refreshToken;
        // }

        return true;
      }),
    );
  }
}