import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Product } from './product';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({

      type: 'postgres',
      // database: 'database/api.sqlite',
      username: "postgres",
      password: 'password',
      synchronize: true,
      dropSchema: true,
      entities: [Product]
    }),
    ProductModule
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }
