import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductRepository) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return this.repo.create(dto);
  }

  async findAll(): Promise<Product[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException('Produto não encontrado');
    return found;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException('Produto não encontrado');
    await this.repo.update(id, dto);
    return this.repo.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException('Produto não encontrado');
    await this.repo.delete(id);
    return { deleted: true };
  }
}
