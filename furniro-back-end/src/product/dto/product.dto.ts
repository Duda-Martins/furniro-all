import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from 'src/category/dto/category.dto';
import { ProductAttributeDto } from './product-attribute.dto';
import { ProductVariantDto } from './product-variant.dto';

export class ProductDto {
  @IsNumber()
  id: number;

  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  fullDescription: string;

  @IsString()
  additionalInformation: string;

  @IsUrl()
  image: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images!: string[] | null;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount!: number | null;

  @IsDateString()
  postedAt: string;

  @IsNumber()
  categoryId: number;

  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @ValidateNested()
  @Type(() => ProductAttributeDto)
  attributes: ProductAttributeDto;

  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];
}
