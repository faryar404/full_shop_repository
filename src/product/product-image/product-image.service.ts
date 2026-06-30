import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';
import { MinioService } from './minio.service';
import { CreateProductImageDto } from '../dto/product-image.dto';

@Injectable()
export class ProductImageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}

  async create(file: Express.Multer.File, dto: CreateProductImageDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${dto.productId} not found`);
    }

    // آپلود به MinIO → دریافت public URL
    const url = await this.minio.upload(file);

    // اگه isPrimary = true بود، اول primary قبلی رو false کن
    if (dto.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: { productId: dto.productId, isPrimary: true },
        data:  { isPrimary: false },
      });
    }

    return this.prisma.productImage.create({
      data: {
        productId: dto.productId,
        url,
        isPrimary: dto.isPrimary ?? false,
        sortOrder: dto.sortOrder ?? 0,
      },
    });
  }

  async remove(id: number) {
    const image = await this.prisma.productImage.findUnique({
      where: { id },
    });
    if (!image) {
      throw new NotFoundException(`ProductImage with id ${id} not found`);
    }

    // اول از MinIO حذف کن، بعد از DB
    await this.minio.delete(image.url);
    await this.prisma.productImage.delete({ where: { id } });
  }
}
