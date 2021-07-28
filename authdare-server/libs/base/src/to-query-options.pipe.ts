import { pickBy } from 'lodash';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { QueryOptions } from './query-options';

@Injectable()
export class ToQueryOptionsPipe implements PipeTransform {
  transform(value: QueryOptions, metadata: ArgumentMetadata) {
    return pickBy(plainToClass(QueryOptions, value), (e) => e)
  }
}
