import { CommonEntity } from '../class';

export class UserDetails extends CommonEntity<UserDetails> {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    orgname?: string;
}
