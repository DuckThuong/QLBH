import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity('Payments')
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderID' })
  order: Order;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: ['Credit Card', 'PayPal', 'COD'],
    default: 'Credit Card',
  })
  paymentMethod: 'Credit Card' | 'PayPal' | 'COD';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
}
