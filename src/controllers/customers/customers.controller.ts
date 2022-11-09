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

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers(): string {
    return 'Customers';
  }

  @Post()
  create(@Body() payload: unknown, @Res() res: Response) {
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
