import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from './src/products/entities/product.entity';
import { Order } from './src/orders/entities/order.entity';
import { OrderItem } from './src/orders/entities/order-item.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [Product, Order, OrderItem],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
