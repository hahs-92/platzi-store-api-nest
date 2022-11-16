import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandsService } from '../brands/brands.service';

import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDTO, UdpateProductDTO } from '../../dtos/products.dto';

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

  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    // return this.products;
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: string) {
    // const product = this.products.find((product) => product.id === id);
    // const product = await this.productRepo.findOneBy({ id });
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand'],
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
      const brand = await this.brandsService.findOne(product.brandId);
      newProduct.brand = brand;
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
      const brand = await this.brandsService.findOne(+id);
      product.brand = brand;
    }

    this.productRepo.merge(product, changes);
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
