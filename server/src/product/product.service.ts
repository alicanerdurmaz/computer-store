import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';

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
      .select('Part Price Name')
      .lean()
      .exec()) as Product[];

    return result;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
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

  async deleteProduct(id: string): Promise<Product> {
    const result = await this.productModel.findOneAndRemove({ _id: id });

    return result;
  }

  async updateProduct(
    createProductDto: CreateProductDto,
    id: string,
  ): Promise<Product> {
    const updatedProduct = (await this.productModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        createProductDto,
        { new: true },
      )
      .lean()
      .exec()) as Product;

    return updatedProduct;
  }
}
