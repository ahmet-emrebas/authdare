import { Exclude, Expose } from 'class-transformer';
import { pick } from 'lodash';
import { CreateUserDTO } from './create-user.dto';

// Create read profiles to determine which fiels will be exluded to users. 

export class ReadUserDTO extends CreateUserDTO {

    @Exclude() created_at;
    @Exclude() updated_at;
    @Exclude() deleted_at;

    @Expose() timestamp: any;

    constructor(obj?: CreateUserDTO) {
        super(obj);
        this.timestamp = pick(obj, 'created_at', 'updated_at', 'deleted_at');
    }

}
