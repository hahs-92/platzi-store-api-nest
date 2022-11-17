import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoriesService {
  // private counterId = 1;
  // private categories: Category[] = [
  //   {
  //     id: 1,
  //     name: 'Category 1',
  //   },
  // ];

  constructor(
    @InjectRepository(Category) private ctgRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.ctgRepo.find();
  }

  async findOne(id: number) {
    // const category = await this.ctgRepo.findOneBy({ id });
    const category = await this.ctgRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCtg = this.ctgRepo.create(data);

    return this.ctgRepo.save(newCtg);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.ctgRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    this.ctgRepo.merge(category, changes);
    return this.ctgRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.ctgRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return this.ctgRepo.delete(id);
  }
}
