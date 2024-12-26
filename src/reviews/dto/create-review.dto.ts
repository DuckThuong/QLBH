import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  ProductID: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  UserID: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  Rating: number;

  @IsString()
  @IsOptional()
  @Length(1, 500)
  Comment?: string;
}
