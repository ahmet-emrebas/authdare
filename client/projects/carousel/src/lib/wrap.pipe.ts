import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrap',
})
export class WrapPipe implements PipeTransform {
  transform(value: string | number, ...args: unknown[]): unknown {
    return `${args[0]}${value}${args[1]})`;
  }
}
