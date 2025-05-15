import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class CreateOrderItemDto {
    @IsNotEmpty()
    productId: number;
  
    @IsNotEmpty()
    quantidade: number;
  }
  
  export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
  
    @IsEnum(['Pendente', 'Concluído', 'Cancelado'])
    status: 'Pendente' | 'Concluído' | 'Cancelado';
  }
  