import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  orderID: number;

  @IsNotEmpty()
  @IsEnum(['Credit Card', 'PayPal', 'COD'], {
    message: 'Payment method must be Credit Card, PayPal, or COD',
  })
  paymentMethod: 'Credit Card' | 'PayPal' | 'COD';

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}
