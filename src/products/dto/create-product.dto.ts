import {
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  ProductName: string;

  @IsString()
  @IsOptional()
  Description?: string;

  @IsDecimal()
  @Min(0)
  Price: number;

  @IsDecimal()
  @Min(0)
  @Max(100)
  @IsOptional()
  Discount?: number = 0;

  @IsInt()
  @IsPositive()
  Stock: number;

  @IsInt()
  @IsOptional()
  CategoryID?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  @IsOptional()
  ImageURLs?: string[];

  @IsOptional()
  CreatedAt?: Date;

  @IsOptional()
  UpdatedAt?: Date;
}
