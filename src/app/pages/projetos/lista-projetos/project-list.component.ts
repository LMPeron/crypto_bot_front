import { IProject } from 'src/app/@core/data/project';
import { WorkSpaceService } from 'src/app/@core/services/workspace.service';
import { IWorkspace } from './../../../@core/data/workspace';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { IFilter } from './../../../@core/data/filter';
import { Subscription, timer } from 'rxjs';
import { FilterService } from './../../../@core/services/filter.service';

import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from 'src/app/@core/services/project.service';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  loadingProjects = false;
  loadingWorkspaces = false;

  projectListSize = 0;
  dataSourceAll = new MatTableDataSource<IProject>();

  workspaceList: IWorkspace[];
  subscription: Subscription;

  filterActive = false;
  filtered = false;

  constructor(
    private workspaceService: WorkSpaceService,
    private projectService: ProjectService,
    private filterService: FilterService,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,

  ) {
    this.filterService.filter$.subscribe((filterData) => {
      this.unsub();
      this.subscribWithFilter(filterData);
    });
  }

  ngOnInit(): void {
    this.subscribNoFilter();
    if (Object.keys(this.activatedRoute.snapshot.params).length > 0) {
      this.toggleFilter();
      this.filterEvent('filter');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribNoFilter() {
    this.unsub();
    this.subscription = timer(0, 30000)
      .pipe(switchMap(async () => this.getAllProjects()))
      .subscribe((result) => result);
  }

  subscribWithFilter(filterData) {
    this.unsub();
    this.subscription = timer(0, 30000)
      .pipe(switchMap(async () => this.getAllProjectWithFilter(filterData)))
      .subscribe((result) => result);
  }

  getWorkspacesByUser(): void {
    this.loadingWorkspaces = true;
    this.workspaceService.getByUser().subscribe(
      (res) => {
        this.workspaceList = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.loadingWorkspaces = false;
  }

  unsub() {
    if (this.subscription !== undefined && this.subscription.closed === false) {
      this.subscription.unsubscribe();
    }
  }

  getAllProjects() {
    this.loadingProjects = true;
    this.projectService.getByWorkspace(this.workspaceService.getCurrentWorkspace().id).subscribe(
      (res) => {
        this.loadingProjects = false;
        this.dataSourceAll = new MatTableDataSource<IProject>(res);
        if (res !== null) {
          this.projectListSize = res.length;
        }
      },
      (err) => {
        this.loadingProjects = false;
        console.log(err);
      }
    );
  }

  getProjectsByWorkspace(workspaceId: string): void {
    this.loadingProjects = true;
    this.projectService.getByWorkspace(workspaceId).subscribe(
      (res) => {
        this.loadingProjects = false;
        this.dataSourceAll = new MatTableDataSource<IProject>(res);
        if (res !== null) {
          this.projectListSize = res.length;
        }
      },
      (err) => {
        this.loadingProjects = false;
        console.log(err);
      }
    )
  }

  getAllProjectWithFilter(filterData: Partial<IFilter>) {
    this.loadingProjects = true;
    this.projectService.getByWorkspace(this.workspaceService.getCurrentWorkspace().id).subscribe(
      (res) => {
        this.loadingProjects = false;
        this.dataSourceAll = new MatTableDataSource<IProject>(res);

        if (res !== null) {
          this.projectListSize = res.length;
        }
      },
      (err) => {
        this.loadingProjects = false;
        console.log(err);
      }
    );
  }

  doFilter(event: Event) {
    this.dataSourceAll.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.projectListSize = this.dataSourceAll.filteredData.length;
  }

  filterEvent(e) {
    if (e === 'closeFilter') {
      this.filterActive = false;
      this.filtered = false;
    } else if (e === 'filter') {
      this.filtered = true;
    }
  }

  closeFilter() {
    this.filterActive = false;
  }

  toggleFilter() {
    this.filterActive = !this.filterActive;

    if (!this.filterActive) {
      this.getAllProjects();
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
}
