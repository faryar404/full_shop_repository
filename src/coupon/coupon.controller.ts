import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CouponService } from './coupon.service';
// import { CreateCouponDto } from './dto/create-coupon.dto';
// import { UpdateCouponDto } from './dto/update-coupon.dto';
// import { Role } from 'src/user/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { User } from 'src/user/decorators/user.decorator';
import type {UserInfo} from 'src/user/decorators/user.decorator';
import { Role } from 'src/dependence/decorators/roles.decorator';


@Controller()
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post("coupons/apply")
  async applyCoupon() {
    return this.couponService.applyCoupon();
  }



  @Post("coupons/remove")
  async removeCoupon() {
    return this.couponService.removeCoupon();
  }



  
  @Get("coupons")
  async getActiveCoupons():Promise<CouponResponseDto[]> {
    return this.couponService.getActiveCoupons();
  }



  @Role(UserType.ADMIN)
  @Post("admin/coupons")
  async createCoupon() {
    return this.couponService.createCoupon();
  }



  @Role(UserType.ADMIN)
  @Get("admin/coupons")
  async getAllCouponsByAdmin(
    @User() user:UserInfo
  ):Promise<CouponResponseDto[]> {
    return this.couponService.getAllCouponsByAdmin();
  }



  @Role(UserType.ADMIN)
  @Patch("admin/coupons/:id")
  async editCoupon() {
    return this.couponService.editCoupon();
  }




  @Role(UserType.ADMIN)
  @Delete("admin/coupons/:id")
  async deleteCouponByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfo
  ) {
    return this.couponService.deleteCouponByAdmin(id);
  }
}
