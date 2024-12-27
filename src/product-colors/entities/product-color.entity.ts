import { Color } from 'src/colors/entities/color.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('ProductColors')
export class ProductColor {
  @PrimaryColumn()
  ProductID: number;

  @PrimaryColumn()
  ColorID: number;

  @ManyToOne(() => Product, (product) => product.productColors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product;

  @ManyToOne(() => Color, (color) => color.productColors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ColorID' })
  color: Color;
}
