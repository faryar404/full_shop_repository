import { Decimal } from "@prisma/client/runtime/library";
import { IsArray, IsNotEmpty, IsString } from "class-validator";


export class ProductsResponseDto{
    id!:number;
    slug!: string;
    title!: string;
    image!:string;
    price!: Decimal;
    discountPrice?: Decimal|null;

    constructor(partial:Partial<ProductsResponseDto>){
        Object.assign(this,partial)
    }
}

export class ProductResponseDto{
    id!:number;
    category!:string;
    slug!: string;
    title!: string;
    description!:string|null;
    images!:{url:string}[];
    variants!:{price:Decimal,discountPrice:Decimal|null,stock:number}[];

    constructor(partial:Partial<ProductResponseDto>){
        Object.assign(this,partial)
    }
}

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    category!:string;

    @IsString()
    @IsNotEmpty()
    slug!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    description!:string;

    @IsArray()
    images!:{url:string}[];

    @IsArray()
    variants!:{price:Decimal,discountPrice:Decimal|null,stock:number}[];
}