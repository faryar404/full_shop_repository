import {applyDecorators,UseInterceptors} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';

export function UploadImages(maxCount = 10){
  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(
        'images',
        maxCount,
      ),
    ),
  );
}