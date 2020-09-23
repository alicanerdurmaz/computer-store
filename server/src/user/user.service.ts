import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/interfaces/user.interface';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { Product } from 'src/product/interfaces/product.interface';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
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
  ): Promise<string[]> {
    const productArray = productId.split(',');
    const updatedShoppingCart = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $push: { shoppingCart: { $each: productArray } } },
      { new: true },
    );

    if (!updatedShoppingCart) {
      throw new NotFoundException(`Something went wrong when updating cart`);
    }

    return updatedShoppingCart.shoppingCart;
  }
  async removeOneFromShoppingCart(
    productId: string,
    userId: string,
  ): Promise<string[]> {
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

    return updatedShoppingCart.shoppingCart;
  }

  async removeAllFromShoppingCart(userId: string): Promise<string[]> {
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
    return updatedShoppingCart.shoppingCart;
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
  ): Promise<{ accessToken: string }> {
    authCredentialsDto.password = await this.hashPassword(
      authCredentialsDto.password,
      10,
    );
    const newUser = new this.userModel(authCredentialsDto);

    try {
      await newUser.save();

      const payload: JwtPayload = {
        email: authCredentialsDto.email,
        id: newUser.id,
      };

      const accessToken = this.jwtService.sign(payload);

      return { accessToken: accessToken };
    } catch (error) {
      // duplicate
      if (error.code === 11000) {
        throw new ConflictException('Email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(password: string, email: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        email: email,
      })
      .select('password email')
      .exec();

    if (user && (await user.validatePassword(password, user.password))) {
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
