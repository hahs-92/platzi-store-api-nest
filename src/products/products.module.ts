import { Module } from '@nestjs/common';

import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from '../services/products/products.service';
import { CategoriesService } from '../services/categories/categories.service';

@Module({
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}
