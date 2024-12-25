import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
  ) {}

  async CreateNewProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createProduct = this.ProductRepository.create(createProductDto);
    return this.ProductRepository.save(createProduct);
  }

  async GetAllProduct(): Promise<Product[]> {
    return this.ProductRepository.find({ relations: ['images'] });
  }

  async GetProductById(ProductID: number): Promise<Product> {
    return this.ProductRepository.findOneBy({ ProductID });
  }

  async GetProductByKeyWord(searchParams: Partial<Product>): Promise<Product> {
    return this.ProductRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdateProductById(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    await this.ProductRepository.update(id, updateProductDto);
  }

  async DeleteNewProductById(id: number): Promise<void> {
    await this.ProductRepository.delete(id);
  }
}
