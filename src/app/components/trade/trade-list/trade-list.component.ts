import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ngx-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
})

export class TradeListComponent implements OnInit {

  @Input() tradeList: any;
  dataSourceAll: any

  constructor() { }

  ngOnInit(): void {
    if (this.tradeList) this.dataSourceAll = new MatTableDataSource<any>(this.tradeList);
  }
}



