import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  @Get(':categoryId/products/:productId')
  getCategory(
    @Param('categoryId') ctgId: string,
    @Param('productId') productId: string,
  ): string {
    return `ctg: ${ctgId} id: ${productId}`;
  }

  @Post()
  create(@Body() payload: any, @Res() res: Response) {
    return res.send({ message: payload });
  }

  @Put(':id')
  update(@Body() payload: any, @Param('id') id: string, @Res() res: Response) {
    return res.send({ message: `${payload.name} id: ${id}` });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return res.send(id);
  }
}
