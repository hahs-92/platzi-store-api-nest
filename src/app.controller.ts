import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/products')
  getProducts(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
    @Query('brand') brand?: string,
  ): string {
    return ` limit: ${limit} offset:  ${offset}`;
  }

  // ! las routas que no sean dinamicas deben ir primero

  @Get('/products/:productId')
  getProduct(@Param('productId') productId: string): string {
    return `my id is: ${productId}`;
  }

  @Get('/categories/:categoryId/products/:productId')
  getCategory(
    @Param('categoryId') ctgId: string,
    @Param('productId') productId: string,
  ): string {
    return `ctg: ${ctgId} id: ${productId}`;
  }
}
