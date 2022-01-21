import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFilter } from '../data/filter';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSource = new Subject<Partial<IFilter>>();

  filter$ = this.filterSource.asObservable();
  constructor() {}

  applyFilter(filter: Partial<IFilter>) {
    this.filterSource.next(filter);
  }
}
