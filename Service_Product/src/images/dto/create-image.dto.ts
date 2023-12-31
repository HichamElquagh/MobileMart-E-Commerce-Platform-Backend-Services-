import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsUUID()
  product_id: string;
}
