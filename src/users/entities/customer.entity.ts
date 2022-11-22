import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { skillSchema, Skill } from '../../products/entities/skills.entity';

@Schema({ collection: 'customers', timestamps: true })
export class Customer extends Document {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  //relaciones
  // one to many embebidas
  // @Prop({
  //   type: [{ name: { type: String }, color: { type: String } }],
  // })
  // skills: Types.Array<Record<string, any>>;

  // tipado
  @Prop({
    type: [skillSchema],
  })
  skills: Types.Array<Skill>;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
