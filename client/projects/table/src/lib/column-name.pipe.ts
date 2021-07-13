import { Pipe, PipeTransform } from '@angular/core';
import { snakeCase, startCase } from 'lodash';

@Pipe({
  name: 'columnName',
})
export class ColumnNamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return startCase(snakeCase(value));
  }
}
