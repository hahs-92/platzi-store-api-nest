import { Injectable, NotFoundException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';

//este servicio es de otro modulo
import { ProductsService } from '../../../products/services/products/products.service';

@Injectable()
export class UsersService {
  // private counterId = 1;
  // private users: User[] = [
  //   {
  //     id: 1,
  //     email: 'correo@mail.com',
  //     password: '12345',
  //     role: 'admin',
  //   },
  // ];

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  findAll() {
    // console.log('apiKey: ', this.configService.get('API_KEY'));
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);

    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number): Promise<Order> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
