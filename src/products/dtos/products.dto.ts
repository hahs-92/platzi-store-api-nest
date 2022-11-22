// nest generate class products/dto/product.dto
// nest g cl products/dto/product.dto

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

// import { PartialType } from '@nestjs/mapped-types';
// PARA USAR SWAGGER SE DEBE UTILIZAR ESTE IMPORT
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dto';

// ESTAS DOS LIBRERIAS SE DEBEN DESCARGAR POR SEPARADO DE NEST

export class CreateProductDTO {
  @ApiProperty({
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  readonly image?: string;

  @ApiProperty()
  @ValidateNested() // utilizamos el dto de ctg, y lo evalua en cascada, unimos dos dtos
  @IsNotEmpty()
  readonly category: CreateCategoryDto;
}

export class UdpateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProduct {
  @IsOptional()
  @IsPositive()
  readonly limit?: number;

  @IsOptional()
  @Min(0)
  readonly offset?: number;

  @IsOptional()
  @Min(0)
  readonly minPrice?: number;

  // es obligatorio si existe minPrice
  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  readonly maxPrice?: number;
}
