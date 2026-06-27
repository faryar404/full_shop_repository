import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';

// NOT TESTED

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService:PrismaService){}

    getCategories(){
        return this.prismaService.category.findMany()
    }

    getParentCategories(){
        return this.prismaService.category.findMany({
            where:{parentId:null}
        });
    }

    async createCategory({name,parentId,slug}:CreateCategoryParam){
        const checkCategory = await this.prismaService.category.findUnique({
            where:{slug}
        });
        if (checkCategory) throw new ConflictException("This category allready exist.")
        
        await this.prismaService.category.create({
            data:{name,parentId,slug}
        });

        return this.getCategories()
    }

    async updateCategory(slug:string,UpdateCategoryParam){
        const checkCategory = await this.prismaService.category.findUnique({
            where:{slug}
        });
        if (checkCategory) throw new ConflictException("This category allready exist.")
        
        const category = await this.prismaService.category.update({
            where:{slug},
            data:{...UpdateCategoryParam}
        });

        return category
    }

    async deleteCategory(slug:string){
        await this.prismaService.category.delete({
            where:{slug}
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