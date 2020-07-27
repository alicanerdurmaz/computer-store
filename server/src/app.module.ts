import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://alicanerdurmaz:alicanerdurmaz123@devcampercluster.oqatm.mongodb.net/devcamper?retryWrites=true&w=majority',
      { useFindAndModify: false },
    ),
  ],
})
export class AppModule {}
