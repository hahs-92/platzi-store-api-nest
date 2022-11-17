import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { ProductEntity } from '../../products/entities/product.entity';
import { Order } from './order.entity';

// tabla ternaria, se crea para resolver la relacion de muchos a muchos
// entre order y products
// esta vez como es una tabla personalizada, la manejamos
// la relacion por nosotros, es personalizada xq lleva mas campos quantity, cretaed, udapted
// esta tabla la creamos para manejar la relacion personalizada de muchos a muchos
// entre productos y ordenes
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // la cantidad de productos en la orden
  @Column({ type: 'int' })
  quantity: number;

  // esta es una relacion unidireccional
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  // relacion bidireccional con order
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
