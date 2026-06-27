import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

import { MulterError } from 'multer';

@Catch(MulterError)
export class MulterExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: MulterError,
    host: ArgumentsHost,
  ) {
    const response =
      host
        .switchToHttp()
        .getResponse();

    response.status(400).json({
      message: exception.message,
    });
  }
}