import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  create(createCartItemDto: CreateCartItemDto) {
    return 'This action adds a new cartItem';
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<void> {
    await this.cartItemRepository.update(id, updateCartItemDto);
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }

  async createByCartId(
    cartId: number,
    createCartItemDtos: CreateCartItemDto[],
  ): Promise<void> {
    for (const createCartItemDto of createCartItemDtos) {
      const newCartItem = this.cartItemRepository.create({
        ...createCartItemDto,
        CartID: cartId,
      });
      await this.cartItemRepository.save(newCartItem);
    }
  }
}
