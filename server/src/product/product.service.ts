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

  async getProducts(
    filter: Record<string, any>,
  ): Promise<{ products: Product[]; numberOfPages: number }> {
    const pageSize = 20;

    if (!filter.search) {
      const result = (await this.productModel
        .find(filter.find)
        .sort(filter.sort)
        .skip(pageSize * (filter.page - 1))
        .limit(pageSize)
        .lean()
        .exec()) as Product[];

      const documentCount = ((await this.productModel
        .find(filter.find)
        .countDocuments()
        .lean()
        .exec()) as unknown) as number;

      const numberOfPages = Math.ceil(documentCount / pageSize);
      return { products: result, numberOfPages };
    }

    const result = (await this.productModel
      .find(
        {
          $and: [{ $text: { $search: filter.search } }, filter.find],
        },
        { score: { $meta: 'textScore' } },
      )
      .sort(filter.sort)
      .skip(pageSize * (filter.page - 1))
      .limit(pageSize)
      .lean()
      .exec()) as Product[];

    return { products: result, numberOfPages: null };
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

  async getManyProduct(idArray: string): Promise<Product[]> {
    try {
      const data = (await this.productModel
        .find({
          _id: { $in: idArray.split(',') },
        })
        .select('Name Price Images _id')
        .lean()
        .exec()) as Product[];
      return data;
    } catch (error) {
      throw new NotFoundException(`Product with  not found`);
    }
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

  async getAllIds(): Promise<any[]> {
    const list = await this.productModel.distinct('_id');
    return list;
  }

  getFilters(): any {
    return this.filters;
  }

  async createFilters(): Promise<void> {
    const filter: any = {};

    const result = (await this.productModel.find().lean().exec()) as Product[];

    const sliders = ['Price', 'Weight'];
    sliders.forEach((e) => {
      filter[e] = [result[0][e], result[1][e]];
    });

    if (!result.length) return;

    result.forEach((e) => {
      for (const [key, value] of Object.entries(e)) {
        if (listOfNotCalculate.includes(key)) {
          continue;
        }

        if (sliders.includes(key)) {
          if (filter[key][0] > value) {
            filter[key][0] = Math.ceil(value);
          }
          if (filter[key][1] < value) {
            filter[key][1] = Math.ceil(value);
          }
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

    filter['filterOrder'] = [
      'Price',
      'Manufacturer',
      'CPU',
      'GPU',
      'CPU Core Count',
      'Memory',
      'Resolution',
      'Refresh Rate',
      'Screen Size',
      'Screen Panel Type',
      'Operating System',
      'SD Card Reader',
      'Weight',
    ];
    filter['sliders'] = sliders;
    this.filters = filter;
  }
}
