import { ClassificationService } from './../../../@core/services/classification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ngx-classification-table',
  templateUrl: './classification-table.component.html',
})
export class ClassificationTableComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = false;
  filtered = false;
  displayedColumns: string[] = [
    'name',
    'active',
    'actions'
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private classificationService: ClassificationService
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.loading = true;
    this.classificationService.getAll().subscribe(
      (res) => {
        this.loading = false;

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  handleRowClick(classification) {
    this.router.navigate(['../', classification.id]);
  }

  doFilter(event: Event) {
    if (
      (event.target as HTMLInputElement).value.trim().toLocaleLowerCase() !== ''
    ) {
      this.filtered = true;
    } else {
      this.filtered = false;
    }

    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
  }

  handleRowdbClick(id: string) {
    this.router.navigate(['/projetos/classificacao/', id]);
  }
}
