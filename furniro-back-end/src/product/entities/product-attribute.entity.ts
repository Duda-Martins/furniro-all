import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';

export enum WarrantyUnit {
  DAYS = 'DAYS',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS',
}

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  productId!: number;

  @Column({ type: 'integer' })
  warrantyQuantity!: number;

  @Column({ type: 'text' })
  warrantyUnit!: WarrantyUnit;

  @OneToOne(() => Product, (product) => product.attributes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;
}
