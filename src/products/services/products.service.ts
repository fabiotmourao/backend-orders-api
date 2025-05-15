import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductRepository) {}

  create(dto: CreateProductDto) {
    return this.repo.create(dto);
  }


  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, dto: UpdateProductDto) {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException('Produto não encontrado');
    await this.repo.update(id, dto);
    return this.repo.findOne(id);
  }

  async remove(id: number) {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException('Produto não encontrado');
    await this.repo.delete(id);
    return { deleted: true };
  }
}
