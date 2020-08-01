import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    ProductModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
