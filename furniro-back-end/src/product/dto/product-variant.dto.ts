import { IsNumber, IsString } from 'class-validator';

export class ProductVariantDto {
  @IsNumber()
  id: number;

  @IsNumber()
  productId: number;

  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsNumber()
  price: number;
}
