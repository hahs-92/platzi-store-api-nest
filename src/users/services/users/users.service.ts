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
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          $set: changes, // hace un merge
        },
        {
          // muestra la nueva version del user
          new: true,
        },
      )
      .exec();

    if (!user) {
      throw new NotFoundException('user not Found');
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException('user not Found');
    }

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
