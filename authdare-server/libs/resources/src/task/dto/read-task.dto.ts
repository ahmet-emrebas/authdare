import { Exclude, Expose } from 'class-transformer';
import { pick } from 'lodash';
import { CreateTaskDTO } from './create-task.dto';

// Create read profiles to determine which fiels will be exluded to users. 

export class ReadTaskDTO extends CreateTaskDTO {

    @Exclude() created_at;
    @Exclude() updated_at;
    @Exclude() deleted_at;

    @Expose() timestamp: any;

    constructor(obj?: CreateTaskDTO) {
        super(obj);
        this.timestamp = pick(obj, 'created_at', 'updated_at', 'deleted_at');
    }

}
