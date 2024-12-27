import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async CreateNewCart(@Body() createCartDto: CreateCartDto) {
    try {
      if (!createCartDto.CartItems || createCartDto.CartItems.length === 0) {
        return { error: 'Thông tin giỏ hàng không hợp lệ' };
      }
      const newCart = await this.cartService.CreateNewCart(createCartDto);
      return { message: 'Tạo giỏ hàng thành công', newCart };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo giỏ hàng',
        error: error.message,
      };
    }
  }

  @Get()
  async GetAllCart() {
    try {
      const CartList = await this.cartService.GetAllCart();
      if (CartList.length === 0) {
        return {
          message: 'Không có giỏ hàng nào trong danh sách',
          CartList,
        };
      }
      return { message: 'Danh sách giỏ hàng', CartList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách giỏ hàng',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetCartById(@Param('id') id: string) {
    try {
      const CartByUserId = await this.cartService.GetCartByUserId(+id);
      if (!CartByUserId) {
        return { message: 'giỏ hàng không tồn tại', CartByUserId };
      }
      return { message: 'giỏ hàng được tìm thấy', CartByUserId };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin giỏ hàng',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdateCartById(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    try {
      await this.cartService.UpdateCartById(+id, updateCartDto);
      return { message: 'Cập nhật giỏ hàng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật giỏ hàng',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewCartById(@Param('id') id: string) {
    try {
      await this.cartService.DeleteNewCartById(+id);
      return { message: 'Xóa giỏ hàng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa giỏ hàng',
        error: error.message,
      };
    }
  }
}