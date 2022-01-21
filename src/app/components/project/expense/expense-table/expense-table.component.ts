import { Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';


@Component({
      selector: 'ngx-expense-table',
      templateUrl: './expense-table.component.html',
      styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit, OnChanges {
      @Input() dataSource;
      @Input() loading;
      @Output() newEditExpenseEvent = new EventEmitter();

      @ViewChild(MatSort, { static: true }) sort: MatSort;
      displayedColumns: string[] = ['type', 'value', 'quantity', 'date', 'description'];

      constructor() { }

      inactivateExpense(): void {
            this.newEditExpenseEvent.emit("inactivateExpense");
      }

      ngOnInit(): void {
            this.dataSource.sort;
      }

      ngOnChanges(): void {
            this.dataSource.sort = this.sort;
      }


      trackByFn(index) {
            return index;
      }

      handleRowdbClick(id: string) {
            this.newEditExpenseEvent.emit({name: "newEditEvent", expenseId: id});
      }

}