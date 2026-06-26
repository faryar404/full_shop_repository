import { Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsResponseDto } from './dto/product.dto';
import { Role } from 'src/dependence/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { AccessTokenGuard } from 'src/guards/access-token/access-token.guard';

@Controller('v1/product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @Get()
    getProducts():Promise<ProductsResponseDto[]>{
        return this.productService.getProducts()
    }

    @Get(':slug')
    getProductBySlug(
        @Param('slug') slug:string
    ){
        return this.productService.getProductBySlug(slug)
    }

    @Post()
    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard)
    createProduct(){}

    @Patch(':id')
    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard)
    updateProduct(){}

    @Delete(':id')
    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard)
    deleteProduct(){}
}