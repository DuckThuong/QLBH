import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column({ length: 100 })
  ProductName: string;

  @Column('text', { nullable: true })
  Description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Price: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  Discount: number;

  @Column()
  Stock: number;

  @Column({ nullable: true })
  CategoryID: number;

  @OneToMany(() => ProductImage, (productImage) => productImage.Product)
  images: ProductImage[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;
}
