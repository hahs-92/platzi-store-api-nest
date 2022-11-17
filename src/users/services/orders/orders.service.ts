import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      // accemos una relacion mas profunda
      // para obtener los products del item
      relations: ['items', 'items.product'],

      //otra manera de hacerlo
      //relations: { items: { product: true } },
    });

    if (!order) {
      throw new NotFoundException('Order not Found');
    }

    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();

    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async udpate(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('Order not Found');
    }

    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('Order not Found');
    }

    return this.orderRepo.delete(order);
  }
}
