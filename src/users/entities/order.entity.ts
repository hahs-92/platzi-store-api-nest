import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  //una order solo pertenece a un cliente
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  // bidrieccional
  // una orden tiene muchos items
  //@Exclude()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  // TRANSFORMACIONES

  // nos permite agregar valores extra (quantity)
  // @Expose()
  // get products() {
  //   if (this.items) {
  //     return this.items
  //       .filter((item) => !!item)
  //       .map((i) => ({
  //         ...i.product,
  //         quantity: i.quantity,
  //         itemId: i.id
  //       }));
  //   }
  // }

  // agregamos el total
  // @Expose()
  // get total() {
  //   if (this.items) {
  //     return this.items
  //       .filter((item) => !!item)
  //       .reduce((acum, item) => {
  //         const totalItem = item.product.price * item.quantity;
  //         return acum + totalItem;
  //       }, 0);
  //   }
  // }
}
