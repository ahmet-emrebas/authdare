import { DtoBase, EntityBase } from './../base/base';
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity()
export class SampleEntity extends EntityBase<SampleEntity> {
    static className = 'SampleEntity';
    @Column() name: string;
}

export class CreateSampleDto extends DtoBase<CreateSampleDto> {
    static className = 'CreateSampleDto';
    @ApiProperty() name: string;
}
export class UpdateSampleDto extends PartialType(CreateSampleDto) {
    static className = 'UpdateSampleDto';
    @ApiProperty() name: string;
}