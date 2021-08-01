import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asset'
})
export class AssetPipe implements PipeTransform {
  transform(value: string | undefined, ...args: string[]): string {
    const base = document.getElementsByTagName('base')[0];
    if (value)
      return base.href + "/" + value;
    return '';
  }
}
