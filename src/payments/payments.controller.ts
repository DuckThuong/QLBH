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
        return { message: 'Thông tin phương thức thanh toán không hợp lệ' };
      }
      const newPayment =
        await this.paymentsService.CreateNewPayment(createPaymentDto);
      return { message: 'Tạo phương thức thanh toán thành công', newPayment };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo phương thức thanh toán',
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
          message: 'Không có phương thức thanh toán nào trong danh sách',
          PaymentList,
        };
      }
      return { message: 'Danh sách phương thức thanh toán', PaymentList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách phương thức thanh toán',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetPaymentById(@Param('id') id: string) {
    try {
      const PaymentById = await this.paymentsService.GetPaymentById(+id);
      if (!PaymentById) {
        return { message: 'phương thức thanh toán không tồn tại', PaymentById };
      }
      return { message: 'phương thức thanh toán được tìm thấy', PaymentById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin phương thức thanh toán',
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
        return { message: 'phương thức thanh toán không tồn tại', PaymentById };
      }
      return { message: 'phương thức thanh toán được tìm thấy', PaymentById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm phương thức thanh toán',
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
      return { message: 'Cập nhật phương thức thanh toán thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật phương thức thanh toán',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewPaymentById(@Param('id') id: string) {
    try {
      await this.paymentsService.DeleteNewPaymentById(+id);
      return { message: 'Xóa phương thức thanh toán thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa phương thức thanh toán',
        error: error.message,
      };
    }
  }
}
