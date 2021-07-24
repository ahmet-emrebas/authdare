import { RelationID, BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CreatePhotoDto } from '../photo';

@Exclude()
export class CreateBlogDto extends BaseDto<CreateBlogDto> {
  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty({
    required: true,
    default: [
      {
        title: 'content sub title here',
        content: 'text content here',
        photos: [{ photo: '/assets/1.png', position: 'right' }],
      } as CreateBlogContentDto,
      {
        title: 'second content sub title here',
        content: 'second text content here',
        photos: [{ photo: '/assets/1.png', position: 'right' }],
      } as CreateBlogContentDto,
    ],
  })
  contents: CreateBlogContentDto[];

  @Expose()
  @ApiProperty({ default: { id: 1 } })
  author: RelationID;
}

@Exclude()
export class CreateBlogContentDto extends BaseDto<CreateBlogContentDto> {
  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty({ default: 1 })
  order: number;

  @Expose()
  @ApiProperty({})
  blog: RelationID;

  @Expose()
  @ApiProperty({})
  photos: CreatePhotoDto[];
}
