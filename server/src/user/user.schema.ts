import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { productSchema } from 'src/product/product.schema';

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: [
    {
      addressName: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  ],
  phone: {
    type: Number,
  },
  shoppingCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],

  orders: { type: [productSchema], select: false },
});

userSchema.methods.validatePassword = async function (
  enteredPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
