import { Pipe, PipeTransform } from '@angular/core';
import { asset } from './get-asset';

@Pipe({
  name: 'asset'
})
export class AssetPipe implements PipeTransform {
  transform(value: string, ...args: string[]): unknown {
    return asset(value);
  }
}
