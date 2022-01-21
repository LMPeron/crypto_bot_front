import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { IProject } from 'src/app/@core/data/project';
import { MatSort, MatSortable } from '@angular/material/sort';

@Component({
  selector: 'ngx-trade-table',
  templateUrl: './trade-table.component.html',
  styleUrls: ['./trade-table.component.scss'],
})
export class TradeTableComponent implements OnInit, OnChanges {
  @Input() dataSource: any;
  @Input() loading: any;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['bought_price', 'sold_price', 'date', 'profit'];
  listProjects: IProject[];

  constructor() { }

  formatPercentage(value: number) {
    let v = value.toString().split('.');
    if (v.length > 1) {
      return `${v[0]},${v[1].slice(0, 2)}%`;
    } else {
      return `${v[0]}%`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.sort.sort(({ id: 'date', start: 'asc'}) as MatSortable);
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  trackByFn(index: any) {
    return index;
  }
}
