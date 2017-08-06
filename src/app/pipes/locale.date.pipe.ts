import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localeDate' })
export class LocaleDatePipe implements PipeTransform {

  transform(value: number) {
    if (value) {
      return `${new Date(value).toLocaleDateString()}, ${new Date(value).toLocaleString([], {hour: '2-digit', minute: '2-digit'})}`;
    }
    return value;
  }
}
