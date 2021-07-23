import { CreateTagDto } from './create-tag.dto';
import { PartialType } from '@nestjs/swagger';


export class UpdateTagDto extends PartialType(CreateTagDto) {
    constructor(values?: UpdateTagDto) {
        super();
        Object.assign(this, values);
    }
}