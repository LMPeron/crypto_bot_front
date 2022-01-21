import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rulesFilter',
})
export class RulesFilterPipe implements PipeTransform {
  hasValue = false;
  transform(arr: string[], searchValue: string) {
    if (!searchValue) { return arr; }
    if (arr === undefined) { return; }

    arr.forEach((element) => {
      if (element === searchValue) {
        this.hasValue = true;
      }
    });
    return this.hasValue;
  }
}
