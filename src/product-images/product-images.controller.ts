import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { ProductImagesService } from './product-images.service';
import { ProductImage } from './entities/product-image.entity';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Controller('api/products-images')
export class ProductImagesController {
  constructor(
    private readonly ProductImageImagesService: ProductImagesService,
  ) {}

  @Post()
  async CreateNewProductImage(
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    try {
      if (!createProductImageDto.ImageURL) {
        return { message: 'Thông tin sản phẩm không hợp lệ' };
      }
      const newProductImage =
        await this.ProductImageImagesService.CreateNewProductImage(
          createProductImageDto,
        );
      return { message: 'Tạo sản phẩm thành công', newProductImage };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo sản phẩm',
        error: error.message,
      };
    }
  }

  @Get()
  async GetAllProductImage() {
    try {
      const ProductImageList =
        await this.ProductImageImagesService.GetAllProductImage();
      if (ProductImageList.length === 0) {
        return {
          message: 'Không có sản phẩm nào trong danh sách',
          ProductImageList,
        };
      }
      return { message: 'Danh sách sản phẩm', ProductImageList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetProductImageById(@Param('id') id: string) {
    try {
      const ProductImageById =
        await this.ProductImageImagesService.GetProductImageById(+id);
      if (!ProductImageById) {
        return { message: 'sản phẩm không tồn tại', ProductImageById };
      }
      return { message: 'sản phẩm được tìm thấy', ProductImageById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin sản phẩm',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetProductImageByKeyWord(@Param() searchParams: Partial<ProductImage>) {
    try {
      const ProductImageById =
        await this.ProductImageImagesService.GetProductImageById(+searchParams);
      if (!ProductImageById) {
        return { message: 'sản phẩm không tồn tại', ProductImageById };
      }
      return { message: 'sản phẩm được tìm thấy', ProductImageById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm sản phẩm',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdateProductImageById(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    try {
      await this.ProductImageImagesService.UpdateProductImageById(
        +id,
        updateProductImageDto,
      );
      return { message: 'Cập nhật sản phẩm thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật sản phẩm',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewProductImageById(@Param('id') id: string) {
    try {
      await this.ProductImageImagesService.DeleteNewProductImageById(+id);
      return { message: 'Xóa sản phẩm thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa sản phẩm',
        error: error.message,
      };
    }
  }
}
