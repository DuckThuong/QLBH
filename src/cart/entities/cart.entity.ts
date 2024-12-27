import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn()
  CartID: number;

  @Column()
  UserID: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  CartItems: CartItem[];
}
