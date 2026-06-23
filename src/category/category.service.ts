import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';

// NOT TESTED

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService:PrismaService){}

    getCategories(){
        return this.prismaService.category.findMany()
    }

    async createCategory({name,parentId,slug}:CreateCategoryParam){
        const checkCategory = await this.prismaService.category.findMany({
            where:{name}
        });
        if (checkCategory.length) throw new ConflictException("This category allready exist.")
        
        await this.prismaService.category.create({
            data:{name,parentId,slug}
        });

        return this.getCategories()
    }

    async updateCategory(categoryId:number,UpdateCategoryParam){
        const checkCategory = await this.prismaService.category.findUnique({
            where:{id:categoryId}
        });
        if(!checkCategory) throw new NotFoundException;

        const category = await this.prismaService.category.update({
            where:{id:categoryId},
            data:{...UpdateCategoryParam}
        });

        return category
    }

    async deleteCategory(categoryId:number){
        await this.prismaService.category.delete({
            where:{id:categoryId}
        });

        return this.getCategories()
    }
}


interface CreateCategoryParam{
    name:string;
    slug:string;
    parentId?:number;
}

interface UpdateCategoryParam{
    name?:string;
    slug?:string;
    parentId?:number;
}