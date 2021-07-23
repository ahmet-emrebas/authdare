import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';


export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    constructor(values?: UpdateProjectDto) {
        super();
        Object.assign(this, values);
    }
}