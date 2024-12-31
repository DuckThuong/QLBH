import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly OrderDetailRepository: Repository<OrderDetail>,
  ) {}

  async CreateNewOrderDetail(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    const createOrderDetail =
      this.OrderDetailRepository.create(createOrderDetailDto);
    return this.OrderDetailRepository.save(createOrderDetail);
  }

  async GetAllOrderDetail(): Promise<OrderDetail[]> {
    return this.OrderDetailRepository.find();
  }

  async GetOrderDetailById(userID: number): Promise<OrderDetail> {
    return this.OrderDetailRepository.findOne({
      where: {
        order: {
          user: { UserID: userID },
        },
      },
      relations: ['order', 'order.user'],
    });
  }

  async GetOrderDetailByKeyWord(
    searchParams: Partial<OrderDetail>,
  ): Promise<OrderDetail> {
    return this.OrderDetailRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdateOrderDetailById(
    id: number,
    updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<void> {
    await this.OrderDetailRepository.update(id, updateOrderDetailDto);
  }

  async DeleteNewOrderDetailById(id: number): Promise<void> {
    await this.OrderDetailRepository.delete(id);
  }
}
