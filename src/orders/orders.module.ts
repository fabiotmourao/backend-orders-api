import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './services/orders.service';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderRepository } from './repositories/order.repository';
import { OrderItemRepository } from './repositories/order-item.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ProductsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, OrderItemRepository],
})
export class OrdersModule {}
