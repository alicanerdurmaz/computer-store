import { IsNotEmpty, IsIn, IsNumber, IsOptional } from 'class-validator';
import productFieldValues from '../product.field-values.js';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsOptional()
  SellerName: string;

  @IsOptional()
  @ApiProperty({
    type: String,
  })
  Seller: Types.ObjectId;

  @ApiProperty()
  Part: string;

  @ApiProperty()
  @IsNotEmpty()
  Model: string;

  @ApiProperty()
  'Screen Size': string;

  @ApiProperty()
  @IsIn(productFieldValues.screenPanelType)
  'Screen Panel Type': string;

  @ApiProperty()
  @IsIn(productFieldValues.resolution)
  Resolution: string;

  @ApiProperty()
  @IsIn(productFieldValues.refreshRate)
  'Refresh Rate': string;

  @ApiProperty()
  @IsNotEmpty()
  Dimensions: string;

  @ApiProperty()
  @IsNumber()
  Weight: number;

  @ApiProperty()
  @IsIn(productFieldValues.cpuCoreCount)
  'CPU Core Count': number;

  @ApiProperty()
  @IsNotEmpty()
  'CPU Core Clock': string;

  @ApiProperty()
  @IsNotEmpty()
  'CPU Boost Clock': string;

  @ApiProperty()
  @IsIn(productFieldValues.memory)
  Memory: number;

  @ApiProperty()
  @IsNotEmpty()
  CPU: string;

  @ApiProperty()
  @IsNotEmpty()
  'CPU Microarchitecture': string;

  @ApiProperty()
  @IsNotEmpty()
  'SSD Storage': string;

  @ApiProperty()
  @IsNotEmpty()
  'SSD Type': string;

  @ApiProperty()
  @IsNotEmpty()
  Storage: string;

  @ApiProperty()
  @IsNotEmpty()
  GPU: string;

  @ApiProperty()
  @IsNotEmpty()
  'GPU Memory': number;

  @ApiProperty()
  @IsNotEmpty()
  'Operating System': string;

  @ApiProperty()
  @IsIn(['Yes', 'No'])
  'SD Card Reader': string;

  @ApiProperty()
  @IsNotEmpty()
  'Front Facing Webcam': string;

  @ApiProperty()
  @IsNotEmpty()
  Images: [];

  @ApiProperty()
  @IsNotEmpty()
  Name: string;

  @ApiProperty()
  @IsNumber()
  Price: number;

  @ApiProperty()
  @IsIn(productFieldValues.manufacturer)
  Manufacturer: string;
}
