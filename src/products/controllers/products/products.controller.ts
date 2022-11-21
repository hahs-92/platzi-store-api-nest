import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from '../../services/products/products.service';
import { CreateProductDTO, UdpateProductDTO } from '../../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of the products' })
  getProducts(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
    @Query('brand') brand?: string,
  ) {
    return this.productsService.findAll();
  }

  // ! las routas que no sean dinamicas deben ir primero

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Res() res: Response, @Body() payload: CreateProductDTO) {
    return res.send(this.productsService.create(payload));
  }

  @Put(':id')
  update(@Body() payload: UdpateProductDTO, @Param('id') id: string) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
