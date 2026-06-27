import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';

@Injectable()
export class ProductImageService {
    constructor(private readonly prismaService:PrismaService){}

    uploadProductImage(files){
        console.log(files)
    }
    
    deleteProductImageById(){}
}
