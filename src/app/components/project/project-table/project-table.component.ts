import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { IProject } from 'src/app/@core/data/project';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
})
export class ProjectTableComponent implements OnInit, OnChanges {
  @Input() dataSource;
  @Input() loading;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['number', 'status', 'name', 'createdBy', 'companyName', 'creationDate', 'dueDate'];

  listProjects: IProject[];
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

    this.router.navigate(['/projetos/', id]);
  }
}
