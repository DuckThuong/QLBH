import { Injectable } from '@nestjs/common';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly ProductImageRepository: Repository<ProductImage>,
  ) {}

  async CreateNewProductImage(
    createProductImageDto: CreateProductImageDto,
  ): Promise<ProductImage> {
    const createProductImage = this.ProductImageRepository.create(
      createProductImageDto,
    );
    return this.ProductImageRepository.save(createProductImage);
  }

  async GetAllProductImage(): Promise<ProductImage[]> {
    return this.ProductImageRepository.find();
  }

  async GetProductImageById(ProductID: number): Promise<ProductImage[]> {
    return this.ProductImageRepository.find({
      where: { Product: { ProductID } },
    });
  }

  async GetProductImageByKeyWord(
    searchParams: Partial<ProductImage>,
  ): Promise<ProductImage> {
    return this.ProductImageRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdateProductImageById(
    id: number,
    updateProductImageDto: UpdateProductImageDto,
  ): Promise<void> {
    await this.ProductImageRepository.update(id, updateProductImageDto);
  }

  async DeleteNewProductImageById(id: number): Promise<void> {
    await this.ProductImageRepository.delete(id);
  }
}
