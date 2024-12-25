import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductImagesService } from '../product-images/product-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ProductImage]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductImagesService],
  exports: [ProductImagesService],
})
export class ProductsModule {}
