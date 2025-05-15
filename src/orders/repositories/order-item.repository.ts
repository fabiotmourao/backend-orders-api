import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItem)
    private repo: Repository<OrderItem>,
  ) {}

  create(item: Partial<OrderItem>) {
    return this.repo.save(item);
  }

  createMany(items: Partial<OrderItem>[]) {
    return this.repo.save(items);
  }  
}
