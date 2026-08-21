import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductsFiltersDto } from './dto/products-filters.dto';
import { ProductRepository } from './repositories/product.repository';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productMapper: ProductMapper,
  ) {}

  async findAll(filters: ProductsFiltersDto) {
    const result = await this.productRepository.findAll(filters);

    return {
      data: result.data.map((product) =>
        this.productMapper.toSummaryDto(product),
      ),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return this.productMapper.toDetailDto(product);
  }
}
