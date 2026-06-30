import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { PrismaModule } from 'src/dependence/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
