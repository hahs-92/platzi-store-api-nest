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

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'Users';
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
