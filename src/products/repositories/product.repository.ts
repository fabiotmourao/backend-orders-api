import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  create(product: Partial<Product>) {
    return this.repo.save(product);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: Partial<Product>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

export { ProductRepository };
