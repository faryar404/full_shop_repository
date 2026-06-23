import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { AccessTokenGuard } from 'src/guards/access-token/access-token.guard';
import { Role } from 'src/dependence/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('v1/categories')
export class CategoryController {
    constructor (private readonly categoryService:CategoryService){}

    @Get()
    getCategories(){
        return this.categoryService.getCategories()
    }

    @Post()
    @UseGuards(AccessTokenGuard)
    @Role(UserRole.ADMIN)
    createCategory(@Body() body:CreateCategoryDto){
        return this.categoryService.createCategory(body)
    }

    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    @Role(UserRole.ADMIN)
    updateCategory(
        @Body() body:UpdateCategoryDto,
        @Param('id' , ParseIntPipe) categoryId:number
    ){
        return this.categoryService.updateCategory(categoryId,body)
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    @Role(UserRole.ADMIN)
    deleteCategory(@Param('id',ParseIntPipe) categoryId:number){
        return this.categoryService.deleteCategory(categoryId)
    }
}
