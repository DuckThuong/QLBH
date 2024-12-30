import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async CreateNewOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      if (!createOrderDto.userID) {
        return { message: 'Thông tin đơn đặt hàng không hợp lệ' };
      }
      const newOrder = await this.ordersService.CreateNewOrder(createOrderDto);
      return { message: 'Tạo đơn đặt hàng thành công', newOrder };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Get()
  async GetAllOrder() {
    try {
      const OrderList = await this.ordersService.GetAllOrder();
      if (OrderList.length === 0) {
        return {
          message: 'Không có đơn đặt hàng nào trong danh sách',
          OrderList,
        };
      }
      return { message: 'Danh sách đơn đặt hàng', OrderList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetOrderById(@Param('id') id: string) {
    try {
      const OrderById = await this.ordersService.GetOrderById(+id);
      if (!OrderById) {
        return { message: 'đơn đặt hàng không tồn tại', OrderById };
      }
      return { message: 'đơn đặt hàng được tìm thấy', OrderById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetOrderByKeyWord(@Param() searchParams: Partial<Order>) {
    try {
      const OrderById = await this.ordersService.GetOrderById(+searchParams);
      if (!OrderById) {
        return { message: 'đơn đặt hàng không tồn tại', OrderById };
      }
      return { message: 'đơn đặt hàng được tìm thấy', OrderById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdateOrderById(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      await this.ordersService.UpdateOrderById(+id, updateOrderDto);
      return { message: 'Cập nhật đơn đặt hàng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewOrderById(@Param('id') id: string) {
    try {
      await this.ordersService.DeleteNewOrderById(+id);
      return { message: 'Xóa đơn đặt hàng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa đơn đặt hàng',
        error: error.message,
      };
    }
  }
}
