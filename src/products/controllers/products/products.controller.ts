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
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDTO, UdpateProductDTO } from '../../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Res() res: Response,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
    @Query('brand') brand?: string,
  ) {
    // return {
    //   message: ` limit: ${limit} offset:  ${offset}`,
    // };

    res.send({
      count: this.productsService.findAll().length,
      result: this.productsService.findAll(),
    });
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
