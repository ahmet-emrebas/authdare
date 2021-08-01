import { Pipe, PipeTransform } from '@angular/core';


export function getAsset(value: string | undefined) {
  const base = document.getElementsByTagName('base')[0];
  if (value)
    return base.href + "/" + value;
  return '';
}

@Pipe({
  name: 'asset'
})
export class AssetPipe implements PipeTransform {
  transform(value: string | undefined, ...args: string[]): string {
    return getAsset(value);
  }
}
