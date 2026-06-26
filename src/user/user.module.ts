import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from 'src/dependence/prisma/prisma.module';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DeleteAuthCookieInterceptor } from './interceptor/deleteCookie.interceptor';
import { OrderController } from './order/order.controller';
import { PaymentController } from './payment/payment.controller';
import { CouponController } from './coupon/coupon.controller';
import { WishlistController } from './wishlist/wishlist.controller';
import { OrderService } from './order/order.service';
import { PaymentService } from './payment/payment.service';
import { CouponService } from './coupon/coupon.service';
import { WishlistService } from './wishlist/wishlist.service';
import { ReviewService } from './review/review.service';
import { ReviewController } from './review/review.controller';

@Module({
  imports:[PrismaModule],
  providers: [AuthService, AddressService , CouponService, PaymentService, OrderService, WishlistService, ReviewService , {
    provide:APP_INTERCEPTOR,
    useClass:DeleteAuthCookieInterceptor
  }],
  controllers: [AuthController, AddressController, WishlistController , CouponController, PaymentController, OrderController , ReviewController ]
})
export class UserModule {}
