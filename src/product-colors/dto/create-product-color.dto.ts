import { IsInt, IsPositive } from 'class-validator';

export class CreateProductColorDto {
  @IsInt({ message: 'ProductID must be an integer.' })
  @IsPositive({ message: 'ProductID must be a positive number.' })
  ProductID: number;

  @IsInt({ message: 'ColorID must be an integer.' })
  @IsPositive({ message: 'ColorID must be a positive number.' })
  ColorID: number;
}
