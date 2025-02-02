import { Product } from 'src/products/entities/product.entity';
import { Color } from 'src/colors/entities/color.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('ProductImages')
export class ProductImage {
  @PrimaryGeneratedColumn()
  ImageID: number;

  @Column('text')
  ImageURL: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  Product: Product;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'int' })
  ColorID: number;

  @ManyToOne(() => Color, (color) => color.productImages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ColorID' })
  color: Color;
}
