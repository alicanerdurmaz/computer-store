import { IsNotEmpty, IsIn, IsNumber } from 'class-validator';
import productFieldValues from '../product.field-values.js';

export class CreateProductDto {
  Part: string;

  @IsNotEmpty()
  Model: string;

  @IsNumber()
  'Screen Size': number;

  @IsIn(productFieldValues.screenPanelType)
  'Screen Panel Type': string;

  @IsIn(productFieldValues.resolution)
  Resolution: string;

  @IsIn(productFieldValues.refreshRate)
  'Refresh Rate': string;

  @IsNotEmpty()
  Dimensions: string;

  @IsNumber()
  Weight: number;

  @IsIn(productFieldValues.cpuCoreCount)
  'CPU Core Count': number;

  @IsNotEmpty()
  'CPU Core Clock': string;

  @IsNotEmpty()
  'CPU Boost Clock': string;

  @IsIn(productFieldValues.memory)
  Memory: number;

  @IsNotEmpty()
  CPU: string;

  @IsNotEmpty()
  'CPU Microarchitecture': string;

  @IsNotEmpty()
  'SSD Storage': string;

  @IsNotEmpty()
  'SSD Type': string;

  @IsNotEmpty()
  Storage: string;

  @IsNotEmpty()
  GPU: string;

  @IsNotEmpty()
  'GPU Memory': number;

  @IsNotEmpty()
  'Operating System': string;

  @IsIn(['Yes', 'No'])
  'SD Card Reader': string;

  @IsNotEmpty()
  'Front Facing Webcam': string;

  @IsNotEmpty()
  Images: [];

  @IsNotEmpty()
  Name: string;

  @IsNumber()
  Price: number;

  @IsIn(productFieldValues.manufacturer)
  Manufacturer: string;
}
