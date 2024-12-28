import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async CreateNewPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      if (!createPaymentDto.amount) {
        return { message: 'Thông tin người dùng không hợp lệ' };
      }
      const newPayment =
        await this.paymentsService.CreateNewPayment(createPaymentDto);
      return { message: 'Tạo người dùng thành công', newPayment };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo người dùng',
        error: error.message,
      };
    }
  }

  @Get()
  async GetAllPayment() {
    try {
      const PaymentList = await this.paymentsService.GetAllPayment();
      if (PaymentList.length === 0) {
        return {
          message: 'Không có người dùng nào trong danh sách',
          PaymentList,
        };
      }
      return { message: 'Danh sách người dùng', PaymentList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách người dùng',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetPaymentById(@Param('id') id: string) {
    try {
      const PaymentById = await this.paymentsService.GetPaymentById(+id);
      if (!PaymentById) {
        return { message: 'Người dùng không tồn tại', PaymentById };
      }
      return { message: 'Người dùng được tìm thấy', PaymentById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin người dùng',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetPaymentByKeyWord(@Param() searchParams: Partial<Payment>) {
    try {
      const PaymentById =
        await this.paymentsService.GetPaymentById(+searchParams);
      if (!PaymentById) {
        return { message: 'Người dùng không tồn tại', PaymentById };
      }
      return { message: 'Người dùng được tìm thấy', PaymentById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm người dùng',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdatePaymentById(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      await this.paymentsService.UpdatePaymentById(+id, updatePaymentDto);
      return { message: 'Cập nhật người dùng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật người dùng',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewPaymentById(@Param('id') id: string) {
    try {
      await this.paymentsService.DeleteNewPaymentById(+id);
      return { message: 'Xóa người dùng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa người dùng',
        error: error.message,
      };
    }
  }
}
