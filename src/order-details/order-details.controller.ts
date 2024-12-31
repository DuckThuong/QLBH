import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetailService } from './order-details.service';
import { OrderDetail } from './entities/order-detail.entity';

@Controller('api/order-details')
export class OrderDetailController {
  constructor(private readonly orderDetailsService: OrderDetailService) {}

  @Post()
  async CreateNewOrderDetail(
    @Body() createOrderDetailDto: CreateOrderDetailDto,
  ) {
    try {
      if (!createOrderDetailDto.OrderID) {
        return { message: 'Thông tin đơn đặt hàng không hợp lệ' };
      }
      const newOrderDetail =
        await this.orderDetailsService.CreateNewOrderDetail(
          createOrderDetailDto,
        );
      return { message: 'Tạo đơn đặt hàng thành công', newOrderDetail };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Get()
  async GetAllOrderDetail() {
    try {
      const OrderDetailList =
        await this.orderDetailsService.GetAllOrderDetail();
      if (OrderDetailList.length === 0) {
        return {
          message: 'Không có đơn đặt hàng nào trong danh sách',
          OrderDetailList,
        };
      }
      return { message: 'Danh sách đơn đặt hàng', OrderDetailList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetOrderDetailById(@Param('id') id: string) {
    try {
      const OrderDetailById =
        await this.orderDetailsService.GetOrderDetailById(+id);
      if (!OrderDetailById) {
        return { message: 'đơn đặt hàng không tồn tại', OrderDetailById };
      }
      return { message: 'đơn đặt hàng được tìm thấy', OrderDetailById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetOrderDetailByKeyWord(@Param() searchParams: Partial<OrderDetail>) {
    try {
      const OrderDetailById =
        await this.orderDetailsService.GetOrderDetailById(+searchParams);
      if (!OrderDetailById) {
        return { message: 'đơn đặt hàng không tồn tại', OrderDetailById };
      }
      return { message: 'đơn đặt hàng được tìm thấy', OrderDetailById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdateOrderDetailById(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    try {
      await this.orderDetailsService.UpdateOrderDetailById(
        +id,
        updateOrderDetailDto,
      );
      return { message: 'Cập nhật đơn đặt hàng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật đơn đặt hàng',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewOrderDetailById(@Param('id') id: string) {
    try {
      await this.orderDetailsService.DeleteNewOrderDetailById(+id);
      return { message: 'Xóa đơn đặt hàng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa đơn đặt hàng',
        error: error.message,
      };
    }
  }
}
