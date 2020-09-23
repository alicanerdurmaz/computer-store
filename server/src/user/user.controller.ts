import {
  Controller,
  Post,
  Get,
  UseGuards,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUser(@GetUser() user: User): Promise<User> {
    return await this.userService.getUser(user.id);
  }

  @Patch('/')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Body() userDto: UserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return await this.userService.updateUser(user.id, userDto);
  }

  @Post('/cart/add')
  async addOneToShoppingCart(
    @GetUser() user: User,
    @Query('productId') productId: string,
  ): Promise<string[]> {
    return await this.userService.addOneToShoppingCart(productId, user.id);
  }

  @Post('/cart/remove')
  async removeOneFromShoppingCart(
    @GetUser() user: User,
    @Query('productId') productId: string,
  ): Promise<string[]> {
    return await this.userService.removeOneFromShoppingCart(productId, user.id);
  }

  @Post('/cart/remove-all')
  async removeAllFromShoppingCart(@GetUser() user: User): Promise<string[]> {
    return await this.userService.removeAllFromShoppingCart(user.id);
  }

  @Get('/order')
  async getOrder(@GetUser() user: User): Promise<User> {
    return await this.userService.getOrder(user.id);
  }

  @Post('/order')
  async addOrder(
    @GetUser() user: User,
    @Body() data: { productsId: string[] },
  ): Promise<any> {
    return await this.userService.addOrder(user.id, data.productsId);
  }
}
