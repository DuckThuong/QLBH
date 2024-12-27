import { IsString, Length } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @Length(1, 50, { message: 'Color name must be between 1 and 50 characters.' })
  ColorName: string;
}
