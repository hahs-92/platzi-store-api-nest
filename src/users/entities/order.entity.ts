import { User } from './user.entity';
import { ProductEntity } from '../../products/entities/product.entity';

export class Order {
  date: Date;
  user: User;
  products: ProductEntity[];
}
