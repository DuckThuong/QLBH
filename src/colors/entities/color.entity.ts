import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';

@Entity('Colors')
export class Color {
  @PrimaryGeneratedColumn()
  ColorID: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  ColorName: string;
  @ManyToMany(() => Product, (product) => product.colors)
  @JoinTable()
  products: Product[];

  @OneToMany(() => ProductColor, (productColor) => productColor.color)
  productColors: ProductColor[];
}
