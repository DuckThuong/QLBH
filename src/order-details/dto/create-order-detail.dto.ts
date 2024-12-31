import { IsNotEmpty, IsNumber, IsPositive, IsDecimal } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  OrderID: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  ProductID: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  Quantity: number;

  @IsNotEmpty()
  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    { message: 'UnitPrice must be a valid decimal with 2 decimal places' },
  )
  @IsPositive()
  UnitPrice: number;
}
