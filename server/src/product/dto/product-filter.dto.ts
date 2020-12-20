import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  Manufacturer: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  'Refresh Rate': number;
}
