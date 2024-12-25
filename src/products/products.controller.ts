import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductImagesService } from 'src/product-images/product-images.service';

@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productImageService: ProductImagesService,
  ) {}

  @Post()
  async CreateNewProduct(@Body() createProductDto: CreateProductDto) {
    try {
      if (!createProductDto.ProductName) {
        return { message: 'Thông tin sản phẩm không hợp lệ' };
      }
      const newProduct =
        await this.productsService.CreateNewProduct(createProductDto);
      return { message: 'Tạo sản phẩm thành công', newProduct };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo sản phẩm',
        error: error.message,
      };
    }
  }

  @Get()
  async GetAllProduct() {
    try {
      const ProductList = await this.productsService.GetAllProduct();
      if (ProductList.length === 0) {
        return {
          message: 'Không có sản phẩm nào trong danh sách',
          ProductList,
        };
      }
      return { message: 'Danh sách sản phẩm', ProductList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetProductById(@Param('id') id: string) {
    try {
      const productInfo = await this.productsService.GetProductById(+id);
      const productImage =
        await this.productImageService.GetProductImageById(+id);
      if (!productInfo && !productImage) {
        return {
          message: 'sản phẩm không tồn tại',
        };
      }
      return {
        message: 'sản phẩm được tìm thấy',
        productById: { productInfo, productImage },
      };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin sản phẩm',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetProductByKeyWord(@Param() searchParams: Partial<Product>) {
    try {
      const productById =
        await this.productsService.GetProductById(+searchParams);
      if (!productById) {
        return { message: 'sản phẩm không tồn tại', productById };
      }
      return { message: 'sản phẩm được tìm thấy', productById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm sản phẩm',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      await this.productsService.UpdateProductById(+id, updateProductDto);
      return { message: 'Cập nhật sản phẩm thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật sản phẩm',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewProductById(@Param('id') id: string) {
    try {
      await this.productsService.DeleteNewProductById(+id);
      return { message: 'Xóa sản phẩm thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa sản phẩm',
        error: error.message,
      };
    }
  }
}
