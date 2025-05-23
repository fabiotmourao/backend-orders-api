import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from './src/products/entities/product.entity';
import { Order } from './src/orders/entities/order.entity';
import { OrderItem } from './src/orders/entities/order-item.entity';

const isRender = !!process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...(isRender
    ? {
        url: process.env.DATABASE_URL,
      }
    : {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl: { rejectUnauthorized: false },
      }),
  entities: [Product, Order, OrderItem],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
