import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { OrderItem } from '../entities/order-item.entity';
  
  @Entity('orders')
  export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToMany(() => OrderItem, (item) => item.order, {
      cascade: true,
      eager: true,
    })
    items: OrderItem[];
  
    @Column('decimal')
    total_pedido: number;
  
    @Column({ default: 'Pendente' })
    status: 'Pendente' | 'Concluído' | 'Cancelado';
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  