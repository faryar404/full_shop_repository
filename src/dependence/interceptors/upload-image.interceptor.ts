import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import multer from 'multer';

import { Observable } from 'rxjs';

import { ImageFileValidator } from '../validators/image-file.validator';

@Injectable()
export class UploadImageInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request =
      context
        .switchToHttp()
        .getRequest();

    const files = request.files as Express.Multer.File[];

    if (files?.length) {
      ImageFileValidator.validate(
        files,
      );
    }

    return next.handle();
  }
}