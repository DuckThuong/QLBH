import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post()
  async CreateNewReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      if (!createReviewDto.Comment) {
        return { message: 'Thông tin người dùng không hợp lệ' };
      }
      const newReview =
        await this.reviewsService.CreateNewReview(createReviewDto);
      return { message: 'Tạo người dùng thành công', newReview };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo người dùng',
        error: error.message,
      };
    }
  }

  @Get()
  async GetAllReview() {
    try {
      const ReviewList = await this.reviewsService.GetAllReview();
      if (ReviewList.length === 0) {
        return {
          message: 'Không có người dùng nào trong danh sách',
          ReviewList,
        };
      }
      return { message: 'Danh sách người dùng', ReviewList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách người dùng',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetReviewById(@Param('id') id: string) {
    try {
      const ReviewById = await this.reviewsService.GetReviewById(+id);
      if (!ReviewById) {
        return { message: 'Người dùng không tồn tại', ReviewById };
      }
      return { message: 'Người dùng được tìm thấy', ReviewById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin người dùng',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetReviewByKeyWord(@Param() searchParams: Partial<Review>) {
    try {
      const ReviewById = await this.reviewsService.GetReviewById(+searchParams);
      if (!ReviewById) {
        return { message: 'Người dùng không tồn tại', ReviewById };
      }
      return { message: 'Người dùng được tìm thấy', ReviewById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm người dùng',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdateReviewById(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    try {
      await this.reviewsService.UpdateReviewById(+id, updateReviewDto);
      return { message: 'Cập nhật người dùng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật người dùng',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewReviewById(@Param('id') id: string) {
    try {
      await this.reviewsService.DeleteNewReviewById(+id);
      return { message: 'Xóa người dùng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa người dùng',
        error: error.message,
      };
    }
  }
}
