import { Exclude, Expose } from 'class-transformer';
import { pick, keys, values, } from 'lodash';
import { CreateTaskDTO } from './create-task.dto';

// Create read profiles to determine which fiels will be exluded to users. 

export class ReadTaskDTO extends CreateTaskDTO {

    @Exclude() created_at?= undefined;
    @Exclude() updated_at?= undefined;
    @Exclude() deleted_at?= undefined;

    @Expose()
    timestamp?: any = undefined

    constructor(obj?: CreateTaskDTO) {
        super(obj);
        const timestamp = pick(obj, 'created_at', 'updated_at', 'deleted_at');

        if (timestamp && values(timestamp).reduce((p, c) => p || c)) {
            this.timestamp = timestamp
        }
    }
}
