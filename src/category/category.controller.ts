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

    @Get('parent')
    getParentCategories(){
        return this.categoryService.getParentCategories()
    }

    @Post()
    @UseGuards(AccessTokenGuard)
    @Role(UserRole.ADMIN)
    createCategory(@Body() body:CreateCategoryDto){
        return this.categoryService.createCategory(body)
    }

    @Patch(':slug')
    @UseGuards(AccessTokenGuard)
    @Role(UserRole.ADMIN)
    updateCategory(
        @Body() body:UpdateCategoryDto,
        @Param('slug') slug:string
    ){
        return this.categoryService.updateCategory(slug,body)
    }

    @Delete(':slug')
    @UseGuards(AccessTokenGuard)
    @Role(UserRole.ADMIN)
    deleteCategory(@Param('slug') slug:string){
        return this.categoryService.deleteCategory(slug)
    }
}
