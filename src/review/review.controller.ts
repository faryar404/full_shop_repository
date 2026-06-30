import { Controller, Get, Post, Body, Patch, Param, Delete , ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Role } from 'src/dependence/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import type {UserInfo} from 'src/user/decorators/user.decorator';
import { User } from 'src/user/decorators/user.decorator';



@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get("products/:id/reviews")
  async getProductReviews(
    @Param("productId" , ParseIntPipe) productId : number
  ): Promise<ReviewsResponseDto[]> {
    return this.reviewService.getProductReviews(productId);
  }




  @Post("reviews")
  async createReview() {
    return this.reviewService.createReview();
  }




  @Patch("reviews/:id")
  async editReview() {
    return this.reviewService.editReview();
  }




  @Delete("reviews/:id")
  async deleteReview() {
    return this.reviewService.deleteReview();
  }




  @Role(UserType.ADMIN)
  @Get("admin/reviews")
  async getAllReviewsOfSite():Promise<ReviewsResponseDto[]> {
    return this.reviewService.getAllReviewsOfSite();
  }




  @Role(UserType.ADMIN)
  @Patch("admin/reviews/:id/status")
  async editReviewStatus() {
    return this.reviewService.editReviewStatus();
  }
  


  
  @Role(UserType.ADMIN)
  @Delete("admin/reviews/:id")
  async deleteReviewByAdmin(
    @Param('id', ParseIntPipe) id: number, 
    @User() user: UserInfo                
  ) {
    return this.reviewService.deleteReviewByAdmin(id);
  }
}
