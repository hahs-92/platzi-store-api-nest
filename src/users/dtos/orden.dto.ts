import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  // cuando actualizamos no pedimos products
  // evitamos el problema en el actualizado
  // debido a los types, ya que se recibe un string[]
  // en el dto, y en la entidad su tipo es Products[]
  OmitType(CreateOrderDto, ['products']),
) {}
