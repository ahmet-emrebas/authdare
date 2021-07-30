import { Exclude, Expose } from 'class-transformer';
import { pick } from 'lodash';
import { CreateClientauthDTO } from './create-clientauth.dto';

// Create read profiles to determine which fiels will be exluded to clientauths. 

export class ReadClientauthDTO extends CreateClientauthDTO {

    @Exclude() created_at;
    @Exclude() updated_at;
    @Exclude() deleted_at;

    @Expose() timestamp: any;

    constructor(obj?: CreateClientauthDTO) {
        super(obj);
        this.timestamp = pick(obj, 'created_at', 'updated_at', 'deleted_at');
    }

}
