import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  ProductID: number;

  @IsInt()
  @IsNotEmpty()
  Quantity: number;
}
