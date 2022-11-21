import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private ctgModel: Model<Category>) {}

  findAll() {
    return this.ctgModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.ctgModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCtg = new this.ctgModel(data);
    return newCtg.save();
  }

  async update(id: string, changes: UpdateCategoryDto) {
    const ctg = await this.ctgModel
      .findByIdAndUpdate(
        id,
        {
          $set: changes, // hace un merge
        },
        {
          // muestra la nueva version del ctg
          new: true,
        },
      )
      .exec();

    if (!ctg) {
      throw new NotFoundException('ctg not Found');
    }

    return ctg;
  }

  async remove(id: string) {
    const ctg = await this.ctgModel.findByIdAndDelete(id);

    if (!ctg) {
      throw new NotFoundException('ctg not Found');
    }

    return true;
  }
}
