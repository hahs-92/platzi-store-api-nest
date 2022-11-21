import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDTO, UdpateProductDTO } from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductEntity.name) private productModel: Model<ProductEntity>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      // return null;
      throw new NotFoundException('Product not Found');
    }

    return product;
  }

  create(product: CreateProductDTO) {
    return;
  }

  update(id: string, product: UdpateProductDTO) {
    return;
  }

  delete(id: string) {
    return true;
  }
}
