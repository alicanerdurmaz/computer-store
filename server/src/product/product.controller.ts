/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFiltersPipe } from './pipes/product.filters-pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/interfaces/user.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts(
    @Query(ProductFiltersPipe)
    filter: Record<string, string>,
  ): Promise<{ products: Product[]; numberOfPages: number }> {
    return await this.productService.getProducts(filter);
  }
  @Get('/filters')
  getFilters(): any {
    return this.productService.getFilters();
  }

  @Get('/search')
  async searchProducts(@Query('term') term: string): Promise<Product[]> {
    return this.productService.searchProducts(term);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getUserProducts(@GetUser() user: User): Promise<Product[]> {
    return await this.productService.getUserProducts(user.id);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async addProduct(
    @GetUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    createProductDto.Seller = user.id;
    createProductDto.SellerName = user.name;
    return await this.productService.createProduct(createProductDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productService.updateProduct(createProductDto, id, user);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async removeProduct(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<{ id: string }> {
    return this.productService.deleteProduct(id, user);
  }
}
