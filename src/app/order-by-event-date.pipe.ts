import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByEventDate'
})
export class OrderByEventDatePipe implements PipeTransform {

  transform(array: any[]): any[] {
    if (array) {
      return array.sort((a, b) => {
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      });
    }
    return array;
  }

}
