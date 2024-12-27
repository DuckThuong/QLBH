import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductImage } from './product-images/entities/product-image.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart-items/entities/cart-item.entity';
import { ProductColorsModule } from './product-colors/product-colors.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'qlbh',
      entities: [User, Product, ProductImage, Review, Cart, CartItem],
      synchronize: false,
      logging: false,
    }),
    UsersModule,
    ProductsModule,
    ProductImagesModule,
    ReviewsModule,
    CartModule,
    CartItemsModule,
    ProductColorsModule,
    ColorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
