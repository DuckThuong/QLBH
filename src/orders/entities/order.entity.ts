import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderID: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  })
  status: 'Pending' | 'Completed' | 'Cancelled';

  @Column({
    type: 'enum',
    enum: ['Credit Card', 'PayPal', 'COD'],
    nullable: false,
  })
  paymentMethod: 'Credit Card' | 'PayPal' | 'COD';

  @Column({ type: 'text', nullable: false })
  shippingAddress: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
