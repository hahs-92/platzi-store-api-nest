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

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Customer]), ProductsModule],
  controllers: [UsersController, OrdersController, CustomersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
