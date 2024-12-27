import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity('CartItems')
export class CartItem {
  @PrimaryGeneratedColumn()
  CartItemID: number;

  @Column()
  CartID: number;

  @Column()
  ProductID: number;

  @Column()
  Quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @ManyToOne(() => Cart, (cart) => cart.CartItems)
  @JoinColumn({ name: 'CartID' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'ProductID' })
  product: Product;
}
