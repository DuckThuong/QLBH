import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('OrderDetails')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  OrderDetailID: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'OrderId' })
  order: Order;

  @Column()
  OrderID: number;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  Product: Product;

  @Column()
  ProductID: number;

  @Column({ type: 'int' })
  Quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  UnitPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    asExpression: 'Quantity * UnitPrice',
    generatedType: 'STORED',
  })
  TotalPrice: number;
}
