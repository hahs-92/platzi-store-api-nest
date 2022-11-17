import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn,
} from 'typeorm';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

//@Index(['price', 'stock'])
@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  //@Index() // tambien podriamos usar arriba en la entidad
  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'text' }) // no recibe null. falto hacer eso!
  description?: string;

  @Column({ type: 'varchar' })
  image?: string;

  // por buenas practicas los nombres de las propiedades deben ir en snake_case
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

  // relacion bidireccional
  // no utilizamos joinColum porque aqui la relacion la tiene product
  // ahora products tiene la propiedad brand_id
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' }) // se agrego el joinColum para agregar el name
  brand: Brand;

  //bidireccional
  @ManyToMany(() => Category, (ctg) => ctg.products)
  // join solo debe ir en un lado de la relacion
  // es quien crea la tabla para unir las 2 relaciones
  // la tabla que crea es products_categories_categories
  // tanto JoinTable y column pueden recibir options
  @JoinTable({
    // nombre de la tabla
    name: 'products_categories',
    joinColumn: { name: 'product_id' }, // con esto nombramos las tablas
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];
}
