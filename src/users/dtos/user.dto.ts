import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';

import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty()
  @IsPositive()
  @IsOptional()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
