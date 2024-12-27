import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { CartItemsModule } from 'src/cart-items/cart-items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), CartItemsModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
