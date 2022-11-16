import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Brand } from './brand.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'text' }) // no recibe null. falto hacer eso!
  description?: string;

  @Column({ type: 'varchar' })
  image?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // relacion bidireccional
  // no utilizamos joinColum porque aqui la relacion la tiene product
  // ahora products tiene la propiedad brandId
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
