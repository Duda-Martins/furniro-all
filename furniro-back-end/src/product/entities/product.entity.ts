import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductAttribute } from './product-attribute.entity';
import { ProductVariant } from './product-variant.entity';
import { Category } from 'src/category/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 7, unique: true })
  sku!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  fullDescription!: string;

  @Column({ type: 'text' })
  additionalInformation!: string;

  @Column()
  image!: string;

  @Column({ type: 'simple-json', nullable: true })
  images: string[] | null;

  @Column({ type: 'integer' })
  price!: number;

  @Column({ type: 'integer', nullable: true })
  discount: number | null;

  @Column({ type: 'date' })
  postedAt!: string;

  @Column()
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @OneToOne(
    () => ProductAttribute,
    (productAttribute) => productAttribute.product,
    {
      cascade: true,
    },
  )
  attributes!: ProductAttribute;

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product, {
    cascade: true,
  })
  variants!: ProductVariant[];
}
