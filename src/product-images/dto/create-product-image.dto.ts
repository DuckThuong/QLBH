import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  ImageURL: string;

  @IsNotEmpty()
  ProductID: number;
}
