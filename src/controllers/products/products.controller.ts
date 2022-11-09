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
  getProduct(@Res() res: Response, @Param('productId') productId: string) {
    try {
      const product = this.productsService.findOne(productId);

      if (!product) {
        return res.status(404).send({ message: 'product not found' });
      }

      return res.send(product);
    } catch (error) {
      return res.status(500).send({ message: 'Internal Error' });
    }
  }

  @Post()
  create(@Res() res: Response, @Body() payload: unknown) {
    return res.send(this.productsService.create(payload));
  }

  @Put(':id')
  update(@Body() payload: any, @Param('id') id: string, @Res() res: Response) {
    try {
      const product = this.productsService.update(id, payload);

      if (!product) {
        return res.status(404).send({ message: 'Product no fount' });
      }

      return res.send(product);
    } catch (error) {
      return res.status(500).send({ message: 'Internal Error' });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = this.productsService.delete(id);

      if (!product) {
        return res.status(404).send({ message: 'Product no fount' });
      }

      res.send(product);
    } catch (error) {
      return res.status(500).send({ message: 'Internal Error' });
    }
  }
}
