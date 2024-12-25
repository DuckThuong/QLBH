import { Module } from '@nestjs/common';
import { ProductImagesController } from './product-images.controller';
import { ProductImage } from './entities/product-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesService } from './product-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  exports: [ProductImagesService],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
