import { User } from '@authdare/models';
import { BaseDto } from '@authdare/core';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";


@Exclude()
export class CreatePhotoDto extends BaseDto<CreatePhotoDto>{
    @Expose()
    @ApiProperty({ type: 'string', nullable: false, required: true })
    photo: string;



    @Expose()
    @ApiProperty({
        nullable: false,
        description: 'object containing the id of the profile to which the photo belongs',
        default: { id: 1 },
        required: true
    })
    profile: { id: number | string };


    @Expose()
    @ApiProperty({
        nullable: true,
        description: 'object containing the id of the product to which the photo belongs',
        default: { id: 1 }
    })
    product: { id: number | string };
}