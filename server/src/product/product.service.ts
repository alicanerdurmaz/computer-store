import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/user/interfaces/user.interface';
import { listOfNotCalculate } from 'src/utils/filters';

@Injectable()
export class ProductService {
  private filters;
  constructor(
    @InjectModel('product') private readonly productModel: Model<Product>,
  ) {
    this.createFilters();
  }

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

  async searchProducts(search: string): Promise<Product[]> {
    const result = (await this.productModel
      .find({ $text: { $search: search } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .lean()
      .exec()) as Product[];
    return result;
  }

  async getUserProducts(userId: string): Promise<Product[]> {
    const result = (await this.productModel
      .find({ Seller: userId })
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
    this.createFilters();
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
    this.createFilters();
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

    this.createFilters();
    return { id };
  }

  getFilters(): any {
    return this.filters;
  }

  async createFilters(): Promise<void> {
    const result = (await this.productModel.find().lean().exec()) as Product[];

    if (!result.length) return;

    const filter: any = {};
    result.forEach((e) => {
      for (const [key, value] of Object.entries(e)) {
        if (listOfNotCalculate.includes(key)) {
          continue;
        }
        if (filter.hasOwnProperty(key)) {
          if (filter[key].hasOwnProperty(value)) {
            filter[key][value] += 1;
          } else {
            filter[key][value] = 1;
          }
        } else {
          filter[key] = {};
          filter[key][value] = 1;
        }
      }
    });
    filter.Weight = Object.keys(filter.Weight);
    filter.Price = Object.keys(filter.Price);
    filter.Memory = Object.keys(filter.Memory);
    filter['CPU Core Count'] = Object.keys(filter['CPU Core Count']);
    filter['CPU Core Clock'] = Object.keys(filter['CPU Core Clock']);
    filter['CPU Boost Clock'] = Object.keys(filter['CPU Boost Clock']);
    this.filters = filter;
  }
}
