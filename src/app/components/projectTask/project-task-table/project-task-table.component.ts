import { Router } from '@angular/router';
import { 
  Component,
  OnInit,
  OnChanges,
  Input, 
  SimpleChanges,
  ViewChild,
 } from '@angular/core';
 import { IProjectTask } from '../../../@core/data/projectTask';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'ngx-project-task-table',
  templateUrl: './project-task-table.component.html',
  styleUrls: ['./project-task-table.component.scss'],
})
export class ProjectTaskTableComponent implements OnInit, OnChanges {
  @Input() dataSource;
  @Input() loading;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    'number',
    'status',
    'name',
    'createdBy',
    'companyName',
    'creationDate',
    'dueDate',
  ];

  listProjectTasks: IProjectTask[];
  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  } 

  trackByFn(index) {
    return index;
  }

  handleRowdbClick(id: string) {
    this.router.navigate(['projetos/tarefas/', id]);
  }

}
