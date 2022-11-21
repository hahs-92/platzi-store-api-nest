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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Customer.name, schema: customerSchema },
    ]),

    ProductsModule,
  ],
  controllers: [UsersController, OrdersController, CustomersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
