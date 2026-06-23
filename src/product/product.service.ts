import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prismaService:PrismaService){}

    async getProducts(){
        const product = await this.prismaService.product.findMany({})
    }
       
    getProductBySlug(){}

    createProduct(){}

    updateProduct(){}

    deleteProduct(){}
}

interface CreateProductParam{}

interface UpdateProductParam{}
