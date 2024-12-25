import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  Length,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  Username: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  PasswordHash: string;

  @IsEmail()
  @Length(1, 100)
  @IsNotEmpty()
  Email: string;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  FullName?: string;

  @IsString()
  @Length(1, 15)
  @IsOptional()
  PhoneNumber?: string;

  @IsString()
  @IsOptional()
  Address?: string;

  @IsEnum(['Male', 'Female', 'Other'])
  @IsOptional()
  Gender?: 'Male' | 'Female' | 'Other';

  @IsDateString()
  @IsOptional()
  DateOfBirth?: string;

  @IsEnum(['Admin', 'Customer'])
  @IsOptional()
  Role: 'Admin' | 'Customer' = 'Customer';

  @IsOptional()
  CreatedAt?: Date;

  @IsOptional()
  UpdatedAt?: Date;
}
