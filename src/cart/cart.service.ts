import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

export interface CartWithItemsObject extends Omit<Cart, 'CartItems'> {
  CartItems: { items: CartItem[] };
}

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly CartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly CartItemRepository: Repository<CartItem>,
  ) {}

  async CreateNewCart(createCartDto: CreateCartDto): Promise<Cart> {
    return await this.CartRepository.manager.transaction(
      async (entityManager) => {
        const newCart = entityManager.create(Cart, createCartDto);
        await entityManager.save(Cart, newCart);
        const cartItemsPromises = createCartDto.CartItems.map(async (item) => {
          const existingCartItem = await this.CartItemRepository.findOne({
            where: {
              ProductID: item.ProductID,
            },
          });
          if (existingCartItem) {
            existingCartItem.Quantity += item.Quantity;
            await entityManager.save(CartItem, existingCartItem);
          } else {
            const cartItem = entityManager.create(CartItem, {
              ...item,
              CartID: newCart.CartID,
            });
            await entityManager.save(CartItem, cartItem);
          }
        });

        await Promise.all(cartItemsPromises);
        return newCart;
      },
    );
  }

  async GetAllCart() {
    const carts = await this.CartRepository.find();
    return carts;
  }

  async GetCartByUserId(userId: number): Promise<CartWithItemsObject[]> {
    const cartByUser = await this.CartRepository.find({
      where: { UserID: userId },
      relations: [
        'CartItems',
        'CartItems.product',
        'CartItems.product.images',
        'CartItems.product.productColors',
        'CartItems.product.productColors.color',
      ],
    });
    const cartByUserWithObject = cartByUser.map((cart) => ({
      ...cart,
      CartItems: {
        items: cart.CartItems.map((item) => ({
          ...item,
          product: {
            ...item.product,
            colors: item.product.colors,
          },
        })),
      },
    }));
    return cartByUserWithObject;
  }

  async GetCartByKeyWord(searchParams: Partial<Cart>): Promise<Cart> {
    return this.CartRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdateCartById(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<void> {
    await this.CartRepository.update(id, updateCartDto);
  }

  async DeleteNewCartById(id: number): Promise<void> {
    await this.CartRepository.delete(id);
  }
}
