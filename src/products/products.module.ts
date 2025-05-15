import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './services/products.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // apenas entidades aqui
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository], // custom repo vai aqui
  exports: [ProductsService], // para uso em OrdersModule
})
export class ProductsModule {}
