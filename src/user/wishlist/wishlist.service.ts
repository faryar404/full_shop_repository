import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { NOTFOUND } from 'dns';

@Injectable()
export class WishlistService {



  //دریافت لیست علاقه‌مندی‌های کاربر
  async getWishlist(userId:number):Promise<WishlistResponseDto[]> {
    try {

      const user = await this.prisma.user.findUnique({
        where:{id:userId}
      });

      if(!user) throw new NotFoundException;

      const wishlist = await this.prisma.wishlist.findMany({
        where:{userId:userId},
        select:{
          id: true,
                    productId: true,
                    createdAt: true,
                    updatedAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            images: true,
                            category: true,
                            description: true,
                            stock: true,
                        }
                    }
        } ,
        orderBy:{createdAt:"desc"}
      });

      if(!wishlist || wishlist.length===0) throw new NotFoundException;

      return wishlist.map(item => new WishlistResponseDto(item));

      
    } catch (error) {
      console.error('خطا در دریافت لیست علاقه‌مندی‌های کاربر', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت لیست علاقه‌مندی‌های کاربر رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







  //افزودن یک محصول به لیست علاقه‌مندی‌ها
  async addProductToWishlist() {
    try {
    } catch (error) {
      console.error('خطا در افزودن یک محصول به لیست علاقه‌مندی‌ها', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در افزودن یک محصول به لیست علاقه‌مندی‌ها رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //حذف یک محصول از لیست علاقه‌مندی‌ها
  async deleteProductFromWishlist(id:number) {

    try {

        const removedFromWishlist = await this.prisma.wishlist.delete({
          where: {id},
        });

        if(!removedFromWishlist){
            throw new HttpException("Product not found for removing it from wishlist" , HttpStatus.NOT_FOUND);
        }

        return{
            messsage:"Product removed from wishlist successfully",
            removedFromWishlist
        }
        
    } catch (error) {
      console.error('خطا در حذف یک محصول از لیست علاقه‌مندی‌ها', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در حذف یک محصول از لیست علاقه‌مندی‌ها رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //دریافت گزارش محبوب‌ترین محصولات توسط ادمین در ویش لیست
  async getAdminWishlist() {
    try {
    } catch (error) {
      console.error(
        'خطا در دریافت گزارش محبوب‌ترین محصولات توسط ادمین در ویش لیست',
        error,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت گزارش محبوب‌ترین محصولات توسط ادمین در ویش لیست رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
