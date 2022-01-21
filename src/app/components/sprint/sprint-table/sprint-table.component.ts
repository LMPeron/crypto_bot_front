import { NbToastrService } from '@nebular/theme';
import { SprintService } from './../../../@core/services/sprint.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ngx-sprint-table',
  templateUrl: './sprint-table.component.html',
  styleUrls: ['./sprint-table.component.scss']
})
export class SprintTableComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = false;
  filtered = false;

  displayedColumns: string[] = [
    'name',
    'startDate',
    'finishDate',
    'creationDate'
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private sprintService: SprintService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.loading = true;
    this.sprintService.getAll().subscribe(
      (res) => {
        this.loading = false;

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.loading = false;
        this.onError(err.msg);
      }
    );
  }

  handleRowClick(sprint) {
    this.router.navigate(['../', sprint.id]);
  }


  onError(message: any): void {
    this.loading = false;
    if (message !== '' && message) {
      this.toastrService.show('', message, {
        status: 'danger',
        preventDuplicates: true,
        hasIcon: false,
        duration: 6000,
      });
    } else {
      this.showToaster();
    }
  }

  showToaster() {
    this.toastrService.show('Aguarde um momento e tente novamente.', 'Erro de conexão com a API', {
      status: 'danger',
      preventDuplicates: true,
      hasIcon: false,
      duration: 6000,
    });
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
    this.router.navigate(['/projetos/', id]);
  }
}
