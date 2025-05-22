import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateProductDto } from '../../products/dto/update-product.dto';
import { ProductsService } from '../../products/services/products.service';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly productService: ProductsService,
  ) {}

  async create(dto: CreateOrderDto) {
    let total = 0;
    const items: Partial<OrderItem>[] = [];

    for (const item of dto.items) {
      const product = await this.productService.findOne(item.productId);

      if (!product || product.quantidade_estoque < item.quantidade) {
        throw new BadRequestException('Produto sem estoque suficiente.');
      }

      await this.productService.update(product.id, {
        quantidade_estoque: product.quantidade_estoque - item.quantidade,
      } as UpdateProductDto);
      

      total += product.preco * item.quantidade;

      items.push({
        product,
        quantidade: item.quantidade,
      });
    }

    const order = await this.orderRepo.create({
      status: dto.status,
      total_pedido: total,
    });

    await this.orderItemRepo.createMany(
      items.map((item) => ({
        ...item,
        order,
      })),
    );

    return order;
  }

  findAll() {
    return this.orderRepo.findAll();
  }

  findOne(id: number) {
    return this.orderRepo.findOne(id);
  }
}
