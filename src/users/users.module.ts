import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// otro modulo
import { ProductsModule } from '../products/products.module';

import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';

import { User, userSchema } from './entities/user.entity';
import { Customer, customerSchema } from './entities/customer.entity';
import { OrderService } from './services/order/order.service';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Customer.name, schema: customerSchema },
      { name: Order.name, schema: OrderSchema },
    ]),

    ProductsModule,
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [CustomersService, UsersService, OrderService],
})
export class UsersModule {}
