import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// mongoose utiliza el patron Active Record
@Schema({ collection: 'products', timestamps: true })
export class ProductEntity extends Document {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop()
  description?: string;

  @Prop()
  image?: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
