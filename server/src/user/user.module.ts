import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { productSchema } from 'src/product/product.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
      { name: 'product', schema: productSchema },
    ]),
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
