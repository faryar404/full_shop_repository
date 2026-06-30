import { Controller, Delete, Post, UploadedFiles, UseFilters, UseInterceptors } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { UploadImages } from 'src/dependence/decorators/upload-image.decorator';
import { UploadImageInterceptor } from 'src/dependence/interceptors/upload-image.interceptor';
import { MulterExceptionFilter } from 'src/dependence/filters/multer-exception.filter';

@Controller('product-image')
export class ProductImageController {
    constructor(private readonly imageService:ProductImageService){}

    @Post()
    @UploadImages()
    @UseInterceptors(
        UploadImageInterceptor,
    )
    @UseFilters(
        MulterExceptionFilter,
    )
    uploadProductImage(
        @UploadedFiles() files: Express.Multer.File[],
    ){
        return this.uploadProductImage(files)
    }

    @Delete(':id')
    deleteProductImageById(){}
}
