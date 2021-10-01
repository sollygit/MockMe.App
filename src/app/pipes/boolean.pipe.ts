import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {
  transform(value: number): string {
    return value === 1 ? 'Long' : 'Short';
  }
}
