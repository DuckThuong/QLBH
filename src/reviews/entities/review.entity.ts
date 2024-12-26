import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Reviews')
export class Review {
  @PrimaryGeneratedColumn()
  ReviewID: number;

  @Column()
  ProductID: number;

  @Column()
  UserID: number;

  @Column({ type: 'int', width: 1 })
  Rating: number;

  @Column({ type: 'text', nullable: true })
  Comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: User;
}
