import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strTrim',
})
export class StrTrimPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\s*/g, '').toLowerCase();
  }
}
