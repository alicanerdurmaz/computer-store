import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(filter: Record<string, any>): Promise<Product[]> {
    const pageSize = 48;
    const result = (await this.productModel
      .find(filter.find)
      .sort(filter.sort)
      .skip(pageSize * (filter.page - 1))
      .limit(pageSize)
      .lean()
      .exec()) as Product[];

    return result;
  }

  async getProductById(id: string): Promise<Product> {
    const found = (await this.productModel
      .findOne({ _id: id })
      .lean()
      .exec()) as Product;

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return found;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async updateProduct(
    createProductDto: CreateProductDto,
    id: string,
    user: User,
  ): Promise<Product> {
    const updatedProduct = (await this.productModel
      .findOneAndUpdate(
        {
          _id: id,
          Seller: user.id,
        },
        createProductDto,
        { new: true },
      )
      .lean()
      .exec()) as Product;

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return updatedProduct;
  }

  async deleteProduct(id: string, user: User): Promise<{ id: string }> {
    const found = await this.productModel.findOneAndRemove({
      _id: id,
      Seller: user.id,
    });

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return { id };
  }
}
