import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://alicanerdurmaz:alicanerdurmaz123@devcampercluster.oqatm.mongodb.net/devcamper?retryWrites=true&w=majority',
      { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true },
    ),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
