import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, unique: true })
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
