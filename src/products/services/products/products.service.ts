import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductEntity } from '../../entities/product.entity';
import {
  CreateProductDTO,
  UdpateProductDTO,
  FilterProduct,
} from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductEntity.name) private productModel: Model<ProductEntity>,
  ) {}

  findAll(params?: FilterProduct) {
    if (params) {
      const { limit, offset } = params;
      return this.productModel
        .find()
        .skip(offset * limit)
        .limit(limit)
        .exec();
    }
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

  async create(payload: CreateProductDTO) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  async update(id: string, changes: UdpateProductDTO) {
    const product = await this.productModel
      .findByIdAndUpdate(
        id,
        {
          $set: changes, // hace un merge
        },
        {
          // muestra la nueva version del product
          new: true,
        },
      )
      .exec();

    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    return true;
  }
}
