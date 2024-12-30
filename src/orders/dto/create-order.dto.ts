import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsDecimal,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userID: number; // ID của người dùng thực hiện đơn hàng.

  @IsNotEmpty()
  @IsDecimal()
  totalAmount: number; // Tổng số tiền của đơn hàng.

  @IsEnum(['Pending', 'Completed', 'Cancelled'], {
    message: 'Status must be one of: Pending, Completed, Cancelled',
  })
  status: 'Pending' | 'Completed' | 'Cancelled'; // Trạng thái của đơn hàng.

  @IsEnum(['Credit Card', 'PayPal', 'COD'], {
    message: 'Payment method must be one of: Credit Card, PayPal, COD',
  })
  paymentMethod: 'Credit Card' | 'PayPal' | 'COD'; // Phương thức thanh toán.

  @IsNotEmpty()
  @IsString()
  shippingAddress: string; // Địa chỉ giao hàng.
}
