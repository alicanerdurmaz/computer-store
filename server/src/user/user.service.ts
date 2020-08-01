import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../user/interfaces/user.interface';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { Product } from 'src/product/interfaces/product.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('product') private readonly productModel: Model<Product>,
  ) {}

  async getUser(userId: string): Promise<User> {
    const found = (await this.userModel.findById(userId).lean().exec()) as User;

    if (!found) {
      throw new NotFoundException(`Product with ID "${userId}" not found`);
    }

    return found;
  }
  async updateUser(userId: string, userDto: UserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      userDto,
      { new: true, select: '-shoppingCart' },
    );

    return updatedUser;
  }
  async getShoppingCart(userId: string): Promise<any> {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .select('shoppingCart');

    const populateOptions = {
      path: 'shoppingCart',
      options: { sort: '-Price' },
    };
    await user.populate(populateOptions).execPopulate();

    return user;
  }

  async addOneToShoppingCart(
    productId: string,
    userId: string,
  ): Promise<{ data: string[] }> {
    const updatedShoppingCart = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $push: { shoppingCart: productId } },
      { new: true },
    );

    if (!updatedShoppingCart) {
      throw new NotFoundException(`Something went wrong when updating cart`);
    }

    return { data: updatedShoppingCart.shoppingCart };
  }
  async removeOneFromShoppingCart(
    productId: string,
    userId: string,
  ): Promise<{ data: string[] }> {
    const updatedShoppingCart = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $pull: { shoppingCart: productId } },
      { new: true },
    );

    if (!updatedShoppingCart) {
      throw new NotFoundException(`Something went wrong when updating cart`);
    }

    return { data: updatedShoppingCart.shoppingCart };
  }

  async removeAllFromShoppingCart(userId: string): Promise<{ data: string[] }> {
    const updatedShoppingCart = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $set: { shoppingCart: [] } },
      { new: true },
    );

    if (!updatedShoppingCart) {
      throw new NotFoundException(`Something went wrong when updating cart`);
    }
    return { data: updatedShoppingCart.shoppingCart };
  }
  async getOrder(userId: string): Promise<User> {
    const found = (await this.userModel
      .findById(userId)
      .select('orders')
      .lean()
      .exec()) as User;

    if (!found) {
      throw new NotFoundException(`Product with ID "${userId}" not found`);
    }

    return found;
  }
  async addOrder(userId: string, productsId: string[]): Promise<any> {
    const products = (await this.productModel
      .find({
        _id: {
          $in: productsId,
        },
      })
      .exec()) as Product[];

    await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $push: { orders: { $each: products } } },
      { new: true },
    );
    return { data: 'Purchased' };
  }

  async register(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ data: string }> {
    authCredentialsDto.password = await this.hashPassword(
      authCredentialsDto.password,
      10,
    );
    const newUser = new this.userModel(authCredentialsDto);

    try {
      await newUser.save();
      return { data: 'User Successfully Created' };
    } catch (error) {
      // duplicate
      if (error.code === 11000) {
        throw new ConflictException('Email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const user = await this.userModel
      .findOne({
        email: authCredentialsDto.email,
      })
      .select('password email')
      .exec();

    if (
      user &&
      (await user.validatePassword(authCredentialsDto.password, user.password))
    ) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(
    password: string,
    saltRound: number,
  ): Promise<string> {
    return bcrypt.hash(password, saltRound);
  }
}
