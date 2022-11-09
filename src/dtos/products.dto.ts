export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly stock: number;
  readonly description?: string;
  readonly image?: string;
}

export interface CreateProductDTO extends Omit<Product, 'id'> {}

export interface UdpateProductDTO extends Partial<Product> {}
