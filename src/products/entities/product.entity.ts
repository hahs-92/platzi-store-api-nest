import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// mongoose utiliza el patron Active Record
@Schema({ collection: 'products', timestamps: true })
export class ProductEntity extends Document {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true, index: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  //relaciones
  // embebidas one-one
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
