import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDTO, UdpateProductDTO } from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counter = 1;

  private products: ProductEntity[] = [
    {
      id: '1',
      name: 'Ps5',
      price: 349,
      stock: 3,
      description: 'Ps5 new generation',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      // return null;
      throw new NotFoundException('Product not Found');
    }

    return product;
  }

  create(product: CreateProductDTO) {
    const newProduct: ProductEntity = {
      id: (++this.counter).toString(),
      ...product,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, product: UdpateProductDTO) {
    const productToUdpate = this.findOne(id);

    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...productToUdpate,
      ...product,
    };
    return this.products[index];
  }

  delete(id: string) {
    this.findOne(id);

    const index = this.products.findIndex((item) => item.id === id);

    this.products.splice(index, 1);
    return true;
  }
}
