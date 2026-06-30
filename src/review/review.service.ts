import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { NOTFOUND } from 'dns';

@Injectable()
export class ReviewService {



  // دریافت تمام نظرات یک محصول
  async getProductReviews(productId:number):Promise<ReviewsResponseDto[]> {
    try {
      const product = await this.prisma.product.findUnique({
        where:{id:productId}
      });

      if(!product) throw new NotFoundException;


      const reviews =await this.prisma.review.findMany({
      where:{productId:productId},
      select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                productId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    }
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        images: true,
                    }
                },
            },
            orderBy: {
                createdAt: 'desc' 
            }
    })

    if(!reviews || reviews.length===0) throw new NotFoundException;

    return reviews.map(review => new ReviewsResponseDto(review));


    } catch (error) {
      console.error('خطا در دریافت تمام نظرات یک محصول', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در  دریافت تمام نظرات یک محصول رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //ثبت یک نظر جدید برای محصول
  async createReview() {
    try {
    } catch (error) {
      console.error('خطا در ثبت یک نظر جدید برای محصول', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در ثبت یک نظر جدید برای محصول رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  // ویرایش نظر ارسال‌شده توسط خود کاربر
  async editReview() {
    try {
    } catch (error) {
      console.error('خطا در ویرایش نظر ارسال شده توسط خود کاربر', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در ویرایش نظر توسط خود کاربر رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //حذف نظر توسط خود کاربر
  async deleteReview() {

    try {

        
    } catch (error) {
      console.error('خطا در حذف نظر توسط خود کاربر', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در حذف نظر توسط خود کاربر رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //دریافت لیست تمام نظرات سایت توسط ادمین (جهت بررسی):
  async getAllReviewsOfSite():Promise<ReviewsResponseDto[]> {
    try {

      const reviews = await this.prisma.review.findMany({
        select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                productId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    }
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        images: true,
                    }
                },
            },
            orderBy: {
                createdAt: 'desc' 
            }
      })

      if(!reviews || reviews.length===0) throw new NotFoundException;

      return reviews.map(review => new ReviewResponseDto(review))
      
    } catch (error) {
      console.error('خطا در دریافت لیست تمام نظرات سایت توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت لیست تمام نظرات سایت توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //تایید یا تغییر وضعیت یک نظر توسط ادمین (مثلاً تایید برای نمایش):
  async editReviewStatus() {
    try {
    } catch (error) {
      console.error('خطا در تغییر وضعیت یک نظر توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در تغییر وضعیت یک نظر توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //حذف اجباری یک نظر توسط ادمین
  async deleteReviewByAdmin(id: number) {
    try {
      const deletedReview = await this.prisma.review.delete({
        where: { id },
      });

      if (!deletedReview) {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Review deleted successfully',
        deletedReview,
      };
    } catch (error) {
      console.error('خطا در حذف یک نظر توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در حذف یک نظر توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
