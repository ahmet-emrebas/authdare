import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, RelationID } from '@authdare/core';
import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

@Exclude()
export class CreateProductDto extends BaseDto<CreateProductDto> {
  @Expose()
  @ApiProperty({ type: 'string', maxLength: 50, minLength: 1 })
  @Length(1, 50)
  @IsNotEmpty()
  brand: string;

  @Expose()
  @ApiProperty({ type: 'string', maxLength: 50, minLength: 1 })
  @Length(1, 50)
  @IsNotEmpty()
  productName: string;

  @Expose()
  @ApiProperty({ type: 'string', maxLength: 400, nullable: true })
  @MaxLength(400)
  description: string;

  @Expose()
  @ApiProperty({ type: 'string', maxLength: 10, nullable: true })
  @MaxLength(20)
  color: string;

  @Expose()
  @ApiProperty({ type: 'number', nullable: true })
  @IsNumber()
  price: number;

  @Expose()
  @ApiProperty({ default: { id: 1 }, required: true, nullable: false })
  @IsNotEmpty()
  organization: RelationID;

  @Expose()
  @ApiProperty({
    maxItems: 100,
    nullable: true,
    default: [{ id: 1 }, { id: 2 }],
  })
  @MaxLength(100)
  categories: RelationID[];

  @Expose()
  @ApiProperty({
    maxItems: 100,
    nullable: true,
    default: [{ id: 1 }, { id: 2 }],
  })
  @MaxLength(100)
  photos: RelationID[];
}
