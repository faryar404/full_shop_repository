import {
  Controller,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from '../dto/product-image.dto';


const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  // POST /product-image
  // multipart/form-data  →  fields: image (file), productId, isPrimary?, sortOrder?
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(), // فایل توی buffer نگه‌داشته میشه، MinIO آپلود میکنه
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIMES.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              `Invalid file type. Allowed: ${ALLOWED_MIMES.join(', ')}`,
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: MAX_SIZE_BYTES },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductImageDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    return this.productImageService.create(file, dto);
  }

  // DELETE /product-image/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productImageService.remove(id);
  }
}
