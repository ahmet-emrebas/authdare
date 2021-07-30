import { Exclude, Expose } from 'class-transformer';
import { pick } from 'lodash';
import { CreateAuthDTO } from './create-auth.dto';

// Create read profiles to determine which fiels will be exluded to auths. 

export class ReadAuthDTO extends CreateAuthDTO {

    @Exclude() created_at;
    @Exclude() updated_at;
    @Exclude() deleted_at;

    @Expose() timestamp: any;

    constructor(obj?: CreateAuthDTO) {
        super(obj);
        this.timestamp = pick(obj, 'created_at', 'updated_at', 'deleted_at');
    }

}
