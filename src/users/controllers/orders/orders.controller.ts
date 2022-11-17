import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ParseIntPipe } from '../../../shared/parse-int/parse-int.pipe';

import { OrdersService } from '../../services/orders/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Body() payload: UpdateOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.ordersService.udpate(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.remove(id);
  }
}
