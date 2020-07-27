import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductFilterDto {
  @IsOptional()
  @IsNotEmpty()
  Manufacturer: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  'Refresh Rate': number;
}
