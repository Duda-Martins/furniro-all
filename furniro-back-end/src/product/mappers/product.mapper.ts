import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductDto } from '../dto/product.dto';
import { CategoryDto } from 'src/category/dto/category.dto';
import { ProductAttributeDto } from '../dto/product-attribute.dto';
import { ProductVariantDto } from '../dto/product-variant.dto';
import { ProductDetailsDto } from '../dto/product-details.dto';

@Injectable()
export class ProductMapper {
  toSummaryDto(product: Product): ProductDetailsDto {
    const dto = new ProductDetailsDto();

    dto.id = product.id;
    dto.sku = product.sku;
    dto.name = product.name;
    dto.description = product.description;
    dto.image = product.image;
    dto.price = product.price;
    dto.discount = product.discount;
    dto.postedAt = product.postedAt;

    if (product.category) {
      const categoryDto = new CategoryDto();
      categoryDto.id = product.category.id;
      categoryDto.name = product.category.name;
      dto.category = categoryDto;
    }

    return dto;
  }

  toDetailDto(product: Product): ProductDto {
    const dto = new ProductDto();

    dto.id = product.id;
    dto.sku = product.sku;
    dto.name = product.name;
    dto.description = product.description;
    dto.fullDescription = product.fullDescription;
    dto.additionalInformation = product.additionalInformation;
    dto.image = product.image;
    dto.images = product.images;
    dto.price = product.price;
    dto.discount = product.discount;
    dto.postedAt = product.postedAt;
    dto.categoryId = product.categoryId;

    if (product.category) {
      const categoryDto = new CategoryDto();
      categoryDto.id = product.category.id;
      categoryDto.name = product.category.name;
      dto.category = categoryDto;
    }

    if (product.attributes) {
      const attributeDto = new ProductAttributeDto();
      attributeDto.id = product.attributes.id;
      attributeDto.productId = product.attributes.productId;
      attributeDto.warrantyQuantity = product.attributes.warrantyQuantity;
      attributeDto.warrantyUnit = product.attributes.warrantyUnit;
      dto.attributes = attributeDto;
    }

    if (product.variants) {
      dto.variants = product.variants.map((variant) => {
        const variantDto = new ProductVariantDto();
        variantDto.id = variant.id;
        variantDto.productId = variant.productId;
        variantDto.color = variant.color;
        variantDto.size = variant.size;
        variantDto.price = variant.price;
        return variantDto;
      });
    }

    return dto;
  }

  toDto(product: Product): ProductDto {
    return this.toDetailDto(product);
  }
}
