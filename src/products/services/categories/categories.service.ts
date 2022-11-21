import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private ctgServices: Model<Category>,
  ) {}

  findAll() {
    return this.ctgServices.find().exec();
  }

  async findOne(id: string) {
    const category = await this.ctgServices.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    return;
  }

  update(id: string, changes: UpdateCategoryDto) {
    return;
  }

  remove(id: string) {
    return true;
  }
}
