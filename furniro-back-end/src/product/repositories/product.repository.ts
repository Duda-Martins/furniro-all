import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { ProductsFiltersDto } from '../dto/products-filters.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findAll(filters: ProductsFiltersDto) {
    const {
      name,
      category,
      minPrice,
      maxPrice,
      hasDiscount,
      page = 1,
      limit = 12,
      sortBy = 'postedAt',
      order = 'desc',
    } = filters;

    const qb = this.repository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .addSelect('category.name');

    if (name) {
      qb.andWhere('product.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (category) {
      qb.andWhere('category.name = :category', {
        category,
      });
    }

    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', {
        minPrice,
      });
    }

    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', {
        maxPrice,
      });
    }

    if (hasDiscount === true) {
      qb.andWhere('product.discount IS NOT NULL');
    }

    if (hasDiscount === false) {
      qb.andWhere('product.discount IS NULL');
    }

    if (sortBy === 'price') {
      qb.addSelect(
        'ROUND(product.price * (1.0 - COALESCE(product.discount, 0) / 100.0))',
        'final_price',
      );
      qb.orderBy('final_price', order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      qb.orderBy(`product.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');
    }

    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        category: true,
        variants: true,
        attributes: true,
      },
    });
  }
}
