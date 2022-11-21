import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.brandModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    return;
  }

  update(id: number, changes: UpdateBrandDto) {
    return;
  }

  remove(id: number) {
    return true;
  }
}
