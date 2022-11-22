import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { ProductEntity } from '../../entities/product.entity';
import {
  CreateProductDTO,
  UdpateProductDTO,
  FilterProduct,
} from '../../dtos/products.dto';
import { filter } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductEntity.name) private productModel: Model<ProductEntity>,
  ) {}

  findAll(params?: FilterProduct) {
    if (params) {
      const filters: FilterQuery<ProductEntity> = {};
      const { limit, offset, minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }

      return this.productModel
        .find(filters)
        .skip(offset * limit)
        .limit(limit)
        .exec();
    }
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findOne({ _id: id }) // utilizamos findOne para usar populate
      .populate('brand') // para que nos traiga la info de brand y no solo el id
      .exec();

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
