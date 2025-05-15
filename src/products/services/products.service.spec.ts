import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: ProductRepository;

  const mockProductRepo = {
    create: jest.fn((dto) => Promise.resolve({ id: 1, ...dto })),
    findAll: jest.fn(() => Promise.resolve([])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductRepository,
          useValue: mockProductRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = {
      nome: 'Produto Teste',
      categoria: 'Eletrônicos',
      descricao: 'Um produto legal',
      preco: 99.9,
      quantidade_estoque: 5,
    };

    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(repo.create).toHaveBeenCalledWith(dto);
  });
});
