import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'int' })
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

  //bidireccional
  @ManyToMany(() => Category, (ctg) => ctg.products)
  // join solo debe ir en un lado de la relacion
  // es quien crea la tabla para unir las 2 relaciones
  // la tabla que crea es products_categories_categories
  @JoinTable() // tanto JoinTable y column pueden recibir options
  categories: Category[];
}
