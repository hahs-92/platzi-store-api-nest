import { Injectable, NotFoundException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';

//este servicio es de otro modulo
import { ProductsService } from '../../../products/services/products/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  findAll() {
    //console.log('apiKey: ', this.configService.get('API_KEY'));
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    return;
  }

  update(id: string, changes: UpdateUserDto) {
    return;
  }

  remove(id: string) {
    return true;
  }

  async getOrderByUser(userId: string) {
    // return {
    //   date: new Date(),
    //   user,
    //   products: await this.productsService.findAll(),
    // };
  }
}
