import { RelationID, BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CreatePhotoDto } from '../photo';




@Exclude()
export class CreateBlogDto extends BaseDto<CreateBlogDto>{

    @Expose()
    @ApiProperty()
    title: string;

    @Expose()
    @ApiProperty()
    contents: CreateBlogContentDto[];

    @Expose()
    @ApiProperty()
    author: RelationID;

}

@Exclude()
export class CreateBlogContentDto extends BaseDto<CreateBlogContentDto>{
    @Expose() @ApiProperty() content: string;
    @Expose() @ApiProperty() title: string;

    @Expose()
    @ApiProperty({})
    blog: RelationID;

    @Expose()
    @ApiProperty({})
    photos: CreatePhotoDto[]
}
