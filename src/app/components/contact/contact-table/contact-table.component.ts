import { ContactService } from './../../../@core/services/contact.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ngx-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = false;
  filtered = false;
  displayedColumns: string[] = [
    'name',
    'email',
    'fone',
    'active',
    'actions'
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.loading = true;
    this.contactService.getAll().subscribe(
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
    this.router.navigate(['/projetos/contato/', id]);
  }
}
