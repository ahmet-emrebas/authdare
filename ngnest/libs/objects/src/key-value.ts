import { Trim } from '@authdare/utils';
import { Length } from 'class-validator';
import { BaseClass } from './base-class';

export class KeyValue<K = string, V = string> extends BaseClass<KeyValue> {
    readonly key!: K;
    readonly value!: V;
}

/**
 * KeyValue<string, string>
 * @key 1, 30
 */
class SS<K = string, V = string> extends KeyValue<K, V> {
    @Trim()
    @Length(1, 30)
    readonly key!: K;
}

/**
 * @key 1, 30
 * @value 1, 100
 */
export class Names extends SS {
    @Trim()
    @Length(1, 100)
    readonly value!: string;
}

/**
 * @key 1, 30
 * @value 1, 50
 */
export class Contacts extends SS {
    @Trim()
    @Length(1, 50)
    readonly value!: string;
}

/**
 * @key 1, 30
 * @value 400
 */
export class ShortText extends SS {
    @Trim()
    @Length(0, 400)
    readonly value!: string;
}

/**
 * @key 1, 30
 * @value 2000
 */
export class LongText extends SS {
    @Trim()
    @Length(0, 2000)
    readonly value!: string;
}
