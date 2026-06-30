import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { UserType } from '@prisma/client';
import { User } from 'src/user/decorators/user.decorator';
import type {UserInfo} from 'src/user/decorators/user.decorator';
import { Role } from 'src/dependence/decorators/roles.decorator';


@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get("wishlist")
  async getWishlist(
    @User() user:UserInfo
  ):Promise<WishlistResponseDto[]> {
    return this.wishlistService.getWishlist(user.id);
  }



  @Post("wishlist")
  async addProductToWishlist() {
    return this.wishlistService.addProductToWishlist();
  }

  

  @Delete("wishlist/:id")
  async deleteProductFromWishlist(
    @Param('id') id: number
  ) {
    return this.wishlistService.deleteProductFromWishlist(id);
  }


  @Role(UserType.ADMIN)
  @Get("admin/wishlist/analytics")
  async getWishlistAnalytics(
    @User() user:UserInfo
  ):Promise<WishlistResponseDto> {
    return this.wishlistService.getWishlistAnalytics();
  }

}
