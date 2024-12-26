import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly ReviewRepository: Repository<Review>,
  ) {}

  async CreateNewReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const createReview = this.ReviewRepository.create(createReviewDto);
    return this.ReviewRepository.save(createReview);
  }

  async getReviewByProductId(productId: number): Promise<Review[]> {
    return this.ReviewRepository.find({
      where: { product: { ProductID: productId } },
      relations: ['user'],
    });
  }
  async GetAllReview(): Promise<Review[]> {
    return this.ReviewRepository.find();
  }

  async GetReviewById(ReviewID: number): Promise<Review> {
    return this.ReviewRepository.findOneBy({ ReviewID });
  }

  async GetReviewByKeyWord(searchParams: Partial<Review>): Promise<Review> {
    return this.ReviewRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdateReviewById(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<void> {
    await this.ReviewRepository.update(id, updateReviewDto);
  }

  async DeleteNewReviewById(id: number): Promise<void> {
    await this.ReviewRepository.delete(id);
  }
}
