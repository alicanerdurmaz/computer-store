import { Document, Types } from 'mongoose';

export interface Product extends Document {
  Model: string;
  Part: string;
  Seller: Types.ObjectId;
  SellerName: string;
  'Screen Size': string;
  'Screen Panel Type': string;
  Resolution: string;
  'Refresh Rate': string;
  Dimensions: string;
  Weight: number;
  'CPU Core Count': number;
  'CPU Core Clock': string;
  'CPU Boost Clock': string;
  Memory: number;
  CPU: string;
  'CPU Microarchitecture': string;
  'SSD Storage': string;
  'SSD Type': string;
  Storage: string;
  GPU: string;
  'GPU Memory': number;
  'Operating System': string;
  'SD Card Reader': string;
  'Front Facing Webcam': string;
  Images: [];
  Name: string;
  Price: number;
  Manufacturer: string;
}
