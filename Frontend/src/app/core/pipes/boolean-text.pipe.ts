import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanText',
  standalone: false
})
export class BooleanTextPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Active' : 'In Active';
  }

}
