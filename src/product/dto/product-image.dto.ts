import {
  IsInt,
  IsPositive,
  IsBoolean,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductImageDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}
// url دیگه توی DTO نیست — از MinIO برمیگرده
