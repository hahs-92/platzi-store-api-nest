import { Module } from '@nestjs/common';
//typeorm
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/order-item.entity';

import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders/orders.service';
import { OrderItemController } from './controllers/order-item/order-item.controller';
import { OrderItemService } from './services/order-item/order-item.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Order, Customer, OrderItem]),
  ],
  controllers: [
    UsersController,
    OrdersController,
    CustomersController,
    OrderItemController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
})
export class UsersModule {}
