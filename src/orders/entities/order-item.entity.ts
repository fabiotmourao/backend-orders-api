import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Order } from './order.entity';
  import { Product } from '../../products/entities/product.entity';
  
  @Entity('order_items')
  export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
    order: Order;
  
    @ManyToOne(() => Product)
    product: Product;
  
    @Column()
    quantidade: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  