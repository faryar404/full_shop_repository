import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';
import { ProductResponseDto, ProductsResponseDto } from './dto/product.dto';
import { Decimal } from '@prisma/client/runtime/library';
import slugify from 'slugify';

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) { }

    async getProducts(): Promise<ProductsResponseDto[]> {
        const products = await this.prismaService.product.findMany({
            select: {
                id: true,
                slug: true,
                title: true,
                images: { where: { isPrimary: true }, select: { url: true } },
                variants: { orderBy: { price: 'desc' }, take: 1, select: { price: true, discountPrice: true } }
            }
        });

        return products.map((product) => {
            const { images, variants, ...productItems } = product;
            const fetchProduct = { ...productItems, image: images[0].url, price: variants[0].price, discountPrice: variants[0].discountPrice };
            return new ProductsResponseDto(fetchProduct)
        });
    }

    async getProductBySlug(slug: string) {
        const product = await this.prismaService.product.findUnique({
            where: { slug },
            select: {
                id: true,
                category: { select: { name: true } },
                description: true,
                slug: true,
                title: true,
                variants: {
                    select: {
                        price: true,
                        discountPrice: true,
                        stock: true,
                        attributes: {
                            select: {
                                attributeValue: {
                                    select: { attribute: true, value: true }
                                }
                            }
                        }
                    }
                },
                images: { select: { url: true }, orderBy: { sortOrder: 'desc' } }
            },
        });

        if (!product) throw new NotFoundException;

        const { variants, category, ...productItems } = product;
        const fetchProduct = {
            ...productItems,
            category: category.name,
            variants: variants.map((variant) => {
                const { attributes, ...variantW } = variant;
                return {
                    ...variantW,
                    attributes: attributes.map((att) => {
                        return {
                            attribute: att.attributeValue.attribute.name,
                            value: att.attributeValue.value
                        }
                    })
                }
            })
        };
        return new ProductResponseDto(fetchProduct)
    }

    // async createProduct({category,description,imageUrls,title,variants}:CreateProductParam){
    //     const slug = slugify(title,{lower: true,strict: true});
    //     console.log("slug: " , slug)
    //     const categorySlug = slugify(category,{lower: true,strict: true});

    //     const checkProduct = await this.prismaService.product.findUnique({
    //         where:{slug}
    //     });
    //     if(checkProduct) this.updateProduct()
    //     const checkcategory = await this.prismaService.category.findUnique({where:{slug:categorySlug}});
    //     if(!checkcategory) throw new HttpException('Category not founded',500)

    //     const product = await this.prismaService.product.create({
    //         data:{title,description,slug,categoryId:checkcategory.id}
    //     });

    //     // create image urls for product
    //     imageUrls.forEach(async(url)=>{
    //         await this.prismaService.productImage.create({
    //             data:{url,productId:product.id}
    //         });
    //     });

    //     variants.forEach(async(variant)=>{
    //         await this.prismaService.productVariant.create({
    //             data:{productId:product.id,price:variant.price,sku:variant.sku,stock:variant.stock,}
    //         });
    //         let attributeId = Array;
    //         const attributesId = variant.attributes.forEach(async(att)=>{
    //             const attribute = await this.prismaService.attributeValue.create({
    //                 data:{attribute:{connectOrCreate:
    //                     {where:{name:att.attribute},create:{name:att.attribute}}
    //                 },value:att.value}
    //             });

    //             // attributeId.apply(attribute.id);
    //         })
    //     });
    // }
    async createProduct(dto: CreateProductParam) {
        const category =
            await this.prismaService.category.findUnique({
                where: {
                    id: dto.categoryId,
                },
            });

        if (!category) throw new BadRequestException('Category not found');

        const slug = await this.generateSlug(dto.title);

        const skus = dto.variants.map((v) => v.sku);

        const duplicatedSku = await this.prismaService.productVariant.findFirst({
            where: {
                sku: {
                    in: skus,
                },
            },
        });

        if (duplicatedSku) throw new ConflictException(`SKU ${duplicatedSku.sku} already exists`);

        return this.prismaService.$transaction(
            async (tx) => {
                const product =
                    await tx.product.create({
                        data: {
                            title: dto.title,
                            slug,
                            description:
                                dto.description,
                            categoryId:
                                dto.categoryId,

                            images: {
                                create:
                                    dto.images.map(
                                        (image) => ({
                                            url: image.url,
                                            isPrimary:
                                                image.isPrimary ??
                                                false,
                                            sortOrder:
                                                image.sortOrder ??
                                                0,
                                        }),
                                    ),
                            },
                        },
                    });

                for (const variant of dto.variants) {
                    const createdVariant =
                        await tx.productVariant.create({
                            data: {
                                productId:
                                    product.id,

                                sku: variant.sku,

                                price: variant.price,

                                discountPrice:
                                    variant.discountPrice,

                                stock:
                                    variant.stock,
                            },
                        });

                    await tx.variantAttribute.createMany({
                        data:
                            variant.attributeValueIds.map(
                                (
                                    attributeValueId,
                                ) => ({
                                    variantId:
                                        createdVariant.id,

                                    attributeValueId,
                                }),
                            ),
                    });
                }

                return tx.product.findUnique({
                    where: {
                        id: product.id,
                    },

                    include: {
                        category: true,

                        images: true,

                        variants: {
                            include: {
                                attributes: {
                                    include: {
                                        attributeValue: {
                                            include: {
                                                attribute: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            },
        );
    }

    

    updateProduct(){ }

    deleteProduct(){ }
    private async generateSlug(
            title: string,
        ) {
        const baseSlug = slugify(title, {
            lower: true,
            strict: true,
            trim: true,
        });

        let slug = baseSlug;

        let counter = 1;

        while (
            await this.prismaService.product.findUnique({
                where: {
                    slug,
                },
            })
        ) {
            slug = `${baseSlug}-${counter++}`;
        }

        return slug;
    }

}

interface CreateProductParam {
    categoryId: number;
    title: string;
    description: string;
    images: {url: string;isPrimary?: boolean;sortOrder?: number;}[];
    variants: { price: Decimal, discountPrice?:Decimal,sku: string, stock: number,  attributeValueIds: number[] }[];
}

interface UpdateProductParam { }
