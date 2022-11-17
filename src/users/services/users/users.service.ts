import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'pg';

import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';

//este servicio es de otro modulo
import { ProductsService } from '../../../products/services/products/products.service';

import { CustomersService } from '../customers/customers.service';

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
    private customerService: CustomersService,
    @Inject('PG') private clientPg: Client,
  ) {}

  findAll() {
    // console.log('apiKey: ', this.configService.get('API_KEY'));
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    // const user = await this.userRepo.findOneBy({ id });
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);

    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }

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

  async getOrderByUser(id: number) {
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

  // sin utilizar un orm, de manera nativa
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
