import { EntitySchema } from 'typeorm';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
// new EntitySchema()

export class Schema<T> extends EntitySchema {
    readonly options!: EntitySchemaOptions<any>;
    constructor(options: EntitySchemaOptions<T>) {
        super(options)
    }
}

export class SchemaOptions<T> extends EntitySchemaOptions<T>{
    constructor() {
        super()
    }
}
