import { CategoryDto } from 'src/category/dto/category.dto';

export class ProductDetailsDto {
  id: number;
  sku: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discount: number | null;
  postedAt: string;
  category: CategoryDto;
}
