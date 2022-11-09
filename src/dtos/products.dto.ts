// nest generate class products/dto/product.dto
// nest g cl products/dto/product.dto

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

// ESTAS DOS LIBRERIAS SE DEBEN DESCARGAR POR SEPARADO DE NEST

export class CreateProductDTO {
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
}

export class UdpateProductDTO extends PartialType(CreateProductDTO) {
  @IsString()
  id?: string;
}
