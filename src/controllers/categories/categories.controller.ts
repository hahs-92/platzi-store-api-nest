import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':categoryId/products/:productId')
  getCategory(
    @Param('categoryId') ctgId: string,
    @Param('productId') productId: string,
  ): string {
    return `ctg: ${ctgId} id: ${productId}`;
  }
}
