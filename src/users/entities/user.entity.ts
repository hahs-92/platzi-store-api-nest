import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Customer } from './customer.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // relacion 1 - 1 => esta es una referencia bidireccional
  // no importa donde este la llave cuando es 1 -1
  // no todos los usuarios tiene un customer, si que puede ser null
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  // crea la referencia, en el momento d ela migration, para enlazar con el customer

  // user es quien maneja la relacion, asi que en users table
  // se crea un campo customer_id
  @JoinColumn() // solo debe ir en una de las 2 entidades
  customer: Customer;
}
