import { Module } from '@nestjs/common';
import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';
import { PrismaModule } from 'src/dependence/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ProductImageController],
  providers: [ProductImageService]
})
export class ProductImageModule {}
