import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductMapper } from './mappers/product.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariant, ProductAttribute]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductMapper],
})
export class ProductModule {}
