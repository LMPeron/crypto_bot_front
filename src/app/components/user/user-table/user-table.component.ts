import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { IProject } from 'src/app/@core/data/project';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit, OnChanges {
  @Input() dataSource: any;
  @Input() loading: any;
  @Output() refreshData = new EventEmitter();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'api_key', 'secret', 'investment', 'profit', 'creation_date', 'actions'];
  listProjects: IProject[];

  constructor(private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  inactivateUser(userId: any) {
    this.userService.inactivateUser(userId).subscribe(
      (res) => {
        this.refreshData.emit(true);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  formatPercentage(value: number) {
    let v = value.toString().split('.');
    if (v.length > 1) {
      return `${v[0]},${v[1].slice(0, 2)}%`;
    } else {
      return `${v[0]}%`;
    }
  }

  ngOnInit(): void {
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  trackByFn(index: any) {
    return index;
  }
}
