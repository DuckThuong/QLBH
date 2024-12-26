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
import { error } from 'console';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post()
  async CreateNewReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      if (!createReviewDto.Comment) {
        return { error: 'Thông tin phản hồi không hợp lệ' };
      }
      const newReview =
        await this.reviewsService.CreateNewReview(createReviewDto);
      return { message: 'Tạo phản hồi thành công', newReview };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo phản hồi',
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
          message: 'Không có phản hồi nào trong danh sách',
          ReviewList,
        };
      }
      return { message: 'Danh sách phản hồi', ReviewList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách phản hồi',
        error: error.message,
      };
    }
  }
  @Get('reviewByProduct/:id')
  async getReviewByProductId(@Param('id') id: string) {
    try {
      const ReviewList = await this.reviewsService.getReviewByProductId(+id);
      if (ReviewList.length === 0) {
        return {
          message: 'Không có phản hồi nào trong danh sách',
          ReviewList,
        };
      }
      return { message: 'Danh sách phản hồi', ReviewList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách phản hồi',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetReviewById(@Param('id') id: string) {
    try {
      const ReviewById = await this.reviewsService.GetReviewById(+id);
      if (!ReviewById) {
        return { message: 'phản hồi không tồn tại', ReviewById };
      }
      return { message: 'phản hồi được tìm thấy', ReviewById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin phản hồi',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetReviewByKeyWord(@Param() searchParams: Partial<Review>) {
    try {
      const ReviewById = await this.reviewsService.GetReviewById(+searchParams);
      if (!ReviewById) {
        return { message: 'phản hồi không tồn tại', ReviewById };
      }
      return { message: 'phản hồi được tìm thấy', ReviewById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm phản hồi',
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
      return { message: 'Cập nhật phản hồi thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật phản hồi',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewReviewById(@Param('id') id: string) {
    try {
      await this.reviewsService.DeleteNewReviewById(+id);
      return { message: 'Xóa phản hồi thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa phản hồi',
        error: error.message,
      };
    }
  }
}
