import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @Get()
    getProducts(){}

    @Get(':slug')
    getProductBySlug(){}

    @Post()
    createProduct(){}

    @Patch(':id')
    updateProduct(){}

    @Delete(':id')
    deleteProduct(){}
}