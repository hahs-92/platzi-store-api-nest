import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
    @Query('brand') brand?: string,
  ): string {
    return ` limit: ${limit} offset:  ${offset}`;
  }

  // ! las routas que no sean dinamicas deben ir primero

  @Get(':productId')
  getProduct(@Param('productId') productId: string): string {
    return `my id is: ${productId}`;
  }
}
