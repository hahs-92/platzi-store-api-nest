import { Body, Controller, Post } from '@nestjs/common';

import { OrderItemService } from '../../services/order-item/order-item.service';
import { CreateOrderItemDto } from '../../dtos/order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private itemService: OrderItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemService.create(payload);
  }
}
