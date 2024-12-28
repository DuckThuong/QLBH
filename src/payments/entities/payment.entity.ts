import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('Payments')
export class Payment {
  @PrimaryGeneratedColumn()
  paymentID: number;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'CASCADE' })
  order: Order;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: ['Credit Card', 'PayPal', 'COD'],
    nullable: false,
  })
  paymentMethod: 'Credit Card' | 'PayPal' | 'COD';

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  })
  status: 'Pending' | 'Completed' | 'Failed';

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;
}
