import { IsEnum, IsNumber } from 'class-validator';
import { WarrantyUnit } from '../entities/product-attribute.entity';

export class ProductAttributeDto {
  @IsNumber()
  id: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  warrantyQuantity: number;

  @IsEnum(WarrantyUnit)
  warrantyUnit: WarrantyUnit;
}
