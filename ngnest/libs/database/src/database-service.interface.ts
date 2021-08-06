import { ClassConstructor } from 'class-transformer';
import { Connection, Repository } from 'typeorm';

export interface DatabaseService {
    getConnection(orgname: string): Promise<Connection>;
    createDatabase(orgname: string): Promise<Connection>;
    getRepository(orgname: string, entity: ClassConstructor<any>): Promise<Repository<any>>;
    deleteDatabase(orgname: string): Promise<void>;
}
