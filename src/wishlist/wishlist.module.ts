import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { PrismaModule } from 'src/dependence/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistyModule {}
