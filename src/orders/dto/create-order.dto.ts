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
  userID: number;

  @IsNotEmpty()
  @IsDecimal()
  totalAmount: number;

  @IsEnum(['Pending', 'Completed', 'Cancelled'], {
    message: 'Status must be one of: Pending, Completed, Cancelled',
  })
  status: 'Pending' | 'Completed' | 'Cancelled';

  @IsEnum(['Credit Card', 'PayPal', 'COD'], {
    message: 'Payment method must be one of: Credit Card, PayPal, COD',
  })
  paymentMethod: 'Credit Card' | 'PayPal' | 'COD';

  @IsNotEmpty()
  @IsString()
  shippingAddress: string;
}
