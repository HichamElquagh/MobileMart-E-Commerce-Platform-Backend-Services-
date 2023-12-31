import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDecimal,
  IsUUID,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsNumber()
  stock_quantity?: number;

  @IsNotEmpty()
  @IsUUID()
  brand_id: string;

  @IsOptional()
  @ArrayNotEmpty()
  categories?: string[];
}
