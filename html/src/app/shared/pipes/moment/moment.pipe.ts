import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {
  /**
   * @description Transform the date to a string with the request format
   * @param value The date to transform
   * @param format The format to print the date
   * @returns string representation of the date
   */
  transform(value: Date | moment.Moment, format = 'DD/MM/YYYY'): string {
    if (null === value || undefined === value) {
      return '';
    }
    return moment(value, true).format(format);
  }

}
