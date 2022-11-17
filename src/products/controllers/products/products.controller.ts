import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
    // @Res() res: Response,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
    @Query('brand') brand?: string,
  ) {
    // return {
    //   message: ` limit: ${limit} offset:  ${offset}`,
    // };

    // res.send({
    //   // count: this.productsService.findAll().length,
    //   // result: this.productsService.findAll(),
    // });

    return this.productsService.findAll();
  }

  // ! las routas que no sean dinamicas deben ir primero

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findOne(productId);

    // try {
    //   const product = this.productsService.findOne(productId);

    //   if (!product) {
    //     // return res.status(404).send({ message: 'product not found' });
    //     throw new NotFoundException('Product not Found');
    //   }

    //   // return res.send(product);
    //   return product;
    // } catch (error) {
    //   // return res.status(500).send({ message: 'Internal Error' });
    //   throw new InternalServerErrorException(error);
    // }
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    // return res.send(this.productsService.create(payload));
    // con @Res tendriamos que manejar el async
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Body() payload: UdpateProductDTO, @Param('id') id: string) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByproduct(id, categoryId);
  }
}
