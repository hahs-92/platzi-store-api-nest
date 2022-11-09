import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../entities/product.entity';

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

    return product ? product : null;
  }

  create(product: any) {
    const newProduct: ProductEntity = {
      id: (++this.counter).toString(),
      ...product,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, product: any) {
    let productToUdpate = this.findOne(id);

    if (!productToUdpate) {
      return null;
    }

    productToUdpate = product as ProductEntity;

    this.products = this.products.map((item) =>
      item.id === id ? productToUdpate : item,
    );

    return productToUdpate;
  }

  delete(id: string) {
    const productToDelete = this.findOne(id);

    if (!productToDelete) {
      return null;
    }

    this.products = this.products.filter((item) => item.id !== id);
    return true;
  }
}
