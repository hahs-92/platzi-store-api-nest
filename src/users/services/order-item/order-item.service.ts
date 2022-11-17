import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../../../products/entities/product.entity';

import { OrderItem } from '../../entities/order-item.entity';
import { CreateOrderItemDto } from '../../dtos/order-item.dto';
import { Order } from '../../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({ where: { id: data.orderId } });
    const product = await this.productRepo.findOne({
      where: { id: data.productId.toString() },
    });

    const item = new OrderItem();

    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.orderItemRepo.save(item);
  }

  // falta crear los demas servcios de actualizar eliminar
}
