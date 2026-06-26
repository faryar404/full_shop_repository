import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {



  //بررسی و اعمال کد تخفیف روی سبد خرید
  async applyCoupon() {
    try {
    } catch (error) {
      console.error('خطا دربررسی و اعمال کد تخفیف روی سبد خرید', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در بررسی و اعمال کد تخفیف روی سبد خرید رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }




  //حذف کد تخفیف از روی سبد خرید
  async removeCoupon() {
    try {
    } catch (error) {
      console.error('خطا رد حذف کد تخفیف از روی سبد خرید', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در حذف کد تخفیف از روی سبد خرید رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }





  //دریافت لیست کدهای تخفیف عمومی و فعال
  async getCoupons() {
    try {
    } catch (error) {
      console.error('خطا در دریافت لیست کدهای تخفیف عمومی و فعال', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت لیست کدهای تخفیف عمومی و فعال رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }





  //ایجاد یک کد تخفیف جدید توسط ادمین
  async createCoupon() {
    try {
    } catch (error) {
      console.error('خطا در ایجاد یک کد تخفیف جدید توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در ایجاد یک کد تخفیف جدید توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }





  //دریافت لیست تمامی کدهای تخفیف (فعال و غیرفعال): توسط ادمین
  async getAllCouponsByAdmin() {
    try {
    } catch (error) {
      console.error(
        'خطا در دریافت لیست تمامی کدهای تخفیف (فعال و غیرفعال): توسط ادمین',
        error,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت لیست تمامی کدهای تخفیف (فعال و غیرفعال): توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }





  //بروزرسانی مشخصات کد تخفیف توسط ادمین
  async editCoupon() {
    try {
    } catch (error) {
      console.error('خطا در بروزرسانی مشخصات کد تخفیف توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در بروزرسانی مشخصات کد تخفیف توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



  

  //حذف یا باطل کردن یک کد تخفیف توسط ادمین
  async deleteCouponByAdmin(id: number) {
    try {

      const deletedCoupon = await this.prisma.coupon.delete({
        where: { id },
      });

      if (!deletedCoupon) {
        throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Coupon deleted successfully',
        deletedCoupon,
      };

    } catch (error) {
      console.error('خطا در حذف یا باطل کردن یک کد تخفیف توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در حذف یا باطل کردن یک کد تخفیف توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
