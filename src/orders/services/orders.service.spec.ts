import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderRepository } from '../repositories/order.repository';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { ProductsService } from 'src/products/services/products.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Product } from 'src/products/entities/product.entity';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrderRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockOrderItemRepository = {
    create: jest.fn(),
    createMany: jest.fn(),
  };

  const mockProductsService = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrderRepository, useValue: mockOrderRepository },
        { provide: OrderItemRepository, useValue: mockOrderItemRepository },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order and update stock', async () => {
    const dto: CreateOrderDto = {
      items: [{ productId: 1, quantidade: 2 }],
      status: 'Pendente',
    };

    const mockProduct: Product = {
      id: 1,
      nome: 'Produto Teste',
      categoria: 'Categoria A',
      descricao: 'Descrição',
      preco: 50,
      quantidade_estoque: 10,
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockProductsService.findOne.mockResolvedValue(mockProduct);
    mockProductsService.update.mockResolvedValue(undefined);
    mockOrderRepository.create.mockResolvedValue({ id: 1, ...dto, total_pedido: 100 });
    mockOrderItemRepository.createMany.mockResolvedValue(undefined);

    const result = await service.create(dto);

    expect(mockProductsService.findOne).toHaveBeenCalledWith(1);
    expect(mockProductsService.update).toHaveBeenCalledWith(1, { quantidade_estoque: 8 });
    expect(mockOrderRepository.create).toHaveBeenCalled();
    expect(mockOrderItemRepository.createMany).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });
});
