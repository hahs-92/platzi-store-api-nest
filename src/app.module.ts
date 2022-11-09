import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { BrandsService } from './services/brands/brands.service';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ProductsModule, UsersModule, SharedModule],
  controllers: [
    AppController,
    OrdersController,
    UsersController,
    BrandsController,
    CustomersController,
  ],
  providers: [AppService, BrandsService, CustomersService, UsersService],
  exports: [],
})
export class AppModule {}
