import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFiltersPipe } from './pipes/product.filters-pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query(ProductFiltersPipe)
    filter: Record<string, string>,
  ): Promise<Product[]> {
    return await this.productService.getProducts(filter);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Body() createProductDto: CreateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productService.updateProduct(createProductDto, id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
