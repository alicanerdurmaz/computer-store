import * as mongoose from 'mongoose';
import { Product } from 'src/product/interfaces/product.interface';

export interface User extends mongoose.Document {
  name: string;

  password: string;

  email: string;

  addresses: [
    {
      addressName: string;
      city: string;
      country: string;
      address: string;
    },
  ];

  phone: number;

  shoppingCart: string[];

  orders: Product[];

  validatePassword: (
    enteredPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}
