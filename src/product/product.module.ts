import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/dependence/prisma/prisma.module';
import { ProductImageModule } from './product-image/product-image.module';

@Module({
  imports:[PrismaModule, ProductImageModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
