import { SessionDatabase } from './session-database';
import { UserDetails } from './user-details';

export interface Session {
    uuid: string;
    lang: string;
    details: UserDetails;
    services: string[];
    permissions: string[];
    database: SessionDatabase;
}
