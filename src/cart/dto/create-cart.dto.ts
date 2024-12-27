import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from 'src/cart-items/dto/create-cart-item.dto';

export class CreateCartDto {
  @IsInt()
  @IsNotEmpty()
  UserID: number;

  @IsOptional()
  CreatedAt?: Date;

  @IsOptional()
  UpdatedAt?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  CartItems?: CreateCartItemDto[];
}
