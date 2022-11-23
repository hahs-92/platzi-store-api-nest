import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

import { Customer } from './customer.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Schema({ collection: 'orders', timestamps: true })
export class Order extends Document {
  @Prop({ type: Date })
  date: Date;

  // relacion oneToOne referencia
  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  // relacion one to many by reference
  @Prop({ type: [{ type: Types.ObjectId, ref: ProductEntity.name }] })
  products: Types.Array<ProductEntity>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
