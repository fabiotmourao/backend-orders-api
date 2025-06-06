import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from './src/products/entities/product.entity';
import { Order } from './src/orders/entities/order.entity';
import { OrderItem } from './src/orders/entities/order-item.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: { rejectUnauthorized: false },
  entities: [Product, Order, OrderItem],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
