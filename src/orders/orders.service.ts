import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
  ) {}

  async CreateNewOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createOrder = this.OrderRepository.create(createOrderDto);
    return this.OrderRepository.save(createOrder);
  }

  async GetAllOrder(): Promise<Order[]> {
    return this.OrderRepository.find();
  }

  async GetOrderById(userID: number): Promise<Order> {
    return this.OrderRepository.findOneBy({ user: { UserID: userID } });
  }

  async GetOrderByIdAndState(
    userID: number,
    state?: 'Pending' | 'Completed' | 'Cancelled',
  ): Promise<Order[]> {
    let orders: Order[];
    if (!['Pending', 'Completed', 'Cancelled'].includes(state)) {
      orders = await this.OrderRepository.find({
        where: {
          user: { UserID: userID },
        },
        relations: [
          'user',
          'orderDetails',
          'orderDetails.Product',
          'orderDetails.Product.images',
        ],
      });
    } else {
      orders = await this.OrderRepository.find({
        where: {
          user: { UserID: userID },
          status: state,
        },
        relations: [
          'user',
          'orderDetails',
          'orderDetails.Product',
          'orderDetails.Product.images',
        ],
      });
    }
    return orders.length > 0 ? orders : [];
  }

  async GetOrderByKeyWord(searchParams: Partial<Order>): Promise<Order> {
    return this.OrderRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdateOrderById(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<void> {
    await this.OrderRepository.update(id, updateOrderDto);
  }

  async DeleteNewOrderById(id: number): Promise<void> {
    await this.OrderRepository.delete(id);
  }
}
