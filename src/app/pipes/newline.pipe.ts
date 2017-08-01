import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'newline' })
export class NewlinePipe implements PipeTransform {

  transform(value: string) {
    if (value) {
      return value.replace(new RegExp('\n', 'g'), '<br />');
    }
    return value;
  }
}
