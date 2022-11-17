// nest generate class products/dto/product.dto
// nest g cl products/dto/product.dto

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

// import { PartialType } from '@nestjs/mapped-types';
// PARA USAR SWAGGER SE DEBE UTILIZAR ESTE IMPORT
import { PartialType, ApiProperty } from '@nestjs/swagger';

// ESTAS DOS LIBRERIAS SE DEBEN DESCARGAR POR SEPARADO DE NEST

export class CreateProductDTO {
  @ApiProperty({
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsUrl()
  readonly image?: string;

  @IsPositive()
  readonly brandId: number;

  @IsArray()
  @ArrayNotEmpty()
  readonly categoriesIds: number[];
}

export class UdpateProductDTO extends PartialType(CreateProductDTO) {}
