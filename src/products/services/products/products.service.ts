import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

import { BrandsService } from '../brands/brands.service';
import { Category } from '../../entities/category.entity';

import { ProductEntity } from '../../entities/product.entity';
import {
  CreateProductDTO,
  UdpateProductDTO,
  FilterProductDto,
} from '../../dtos/products.dto';
import { Brand } from '../../entities/brand.entity';

@Injectable()
export class ProductsService {
  // private counter = 1;

  // private products: ProductEntity[] = [
  //   {
  //     id: '1',
  //     name: 'Ps5',
  //     price: 349,
  //     stock: 3,
  //     description: 'Ps5 new generation',
  //   },
  // ];

  // utilizamos el repo de brand, en vez de injectar el servico
  // para evitar que nos triga las relaciones
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    // private brandsService: BrandsService,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category)
    private ctgRepo: Repository<Category>,
  ) {}

  findAll(params?: FilterProductDto) {
    // return this.products;

    if (params) {
      const { limit, offset, maxPrice, minPrice } = params;
      const where: FindOptionsWhere<ProductEntity> = {};

      // este filter no funciona xq no cree el campo price en la entidad
      // ya se creo la migration
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return this.productRepo.find({
        relations: ['brand'],
        take: limit,
        skip: offset,
      });
    }

    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: string) {
    // const product = this.products.find((product) => product.id === id);
    // const product = await this.productRepo.findOneBy({ id });
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });

    if (!product) {
      // return null;
      throw new NotFoundException('Product not Found');
    }

    return product;
  }

  async create(product: CreateProductDTO) {
    // const newProduct = new ProductEntity();
    // newProduct.name = product.name;
    // newProduct.price = product.price;
    // newProduct.stock = product.stock;
    // newProduct.description = product.description;
    // newProduct.image = product.image;

    // tipoorm nos ayuda a crear una instancia y asignar los
    // valores, sin necesidad de hacer lo anterior
    const newProduct = this.productRepo.create(product);

    if (product.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: product.brandId });
      newProduct.brand = brand;
    }

    if (product.categoriesIds) {
      const categories = await this.ctgRepo.findBy({
        id: In(product.categoriesIds),
      });

      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: string, changes: UdpateProductDTO) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    // actualizar cuando hay relacion
    if (changes.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: +id });
      product.brand = brand;
    }

    if (changes.categoriesIds) {
      const categories = await this.ctgRepo.findBy({
        id: In(changes.categoriesIds),
      });

      product.categories = categories;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByproduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId.toString() },
      // necesitamos la relacion para acceder a categories
      relations: ['categories'],
    });

    product.categories = product.categories.filter(
      (ctg) => ctg.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId.toString() },
      // necesitamos la relacion para acceder a categories
      relations: ['categories'],
    });

    const category = await this.ctgRepo.findOne({ where: { id: categoryId } });

    // faltaria validar que no este la ctg ya agregada
    if (category) {
      product.categories.push(category);
    }

    return this.productRepo.save(product);
  }

  async delete(id: string) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not Found');
    }
    return this.productRepo.delete(id);
  }
}
