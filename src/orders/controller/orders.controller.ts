import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
  } from '@nestjs/common';
  import { OrdersService } from '../services/orders.service';
  import { CreateOrderDto } from '../dto/create-order.dto';
  
  @Controller('orders')
  export class OrdersController {
    constructor(private readonly service: OrdersService) {}
  
    @Post()
    create(@Body() dto: CreateOrderDto) {
      return this.service.create(dto);
    }
  
    @Get()
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.service.findOne(id);
    }
  }
  