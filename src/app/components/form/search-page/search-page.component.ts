import { IProjectTask } from './../../../@core/data/projectTask';
import { IProject } from './../../../@core/data/project';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/@core/services/search.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ngx-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  searchQuery$ = new Observable();



  projectList: IProject[] = [];
  taskList: IProjectTask[] = [];
  loadingTask = false;
  loadingProject = false;

  query: string;
  private searchQuery = new Subject<string>();

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(debounceTime(500), distinctUntilChanged()).subscribe((params) => {
      this.query = params.get('query');
      this.search(params.get('query'));

    });
    this.searchQuery$ = this.searchQuery.pipe(debounceTime(600), distinctUntilChanged());
  }

  ngOnDestroy(): void {
    this.searchQuery.unsubscribe();
  }

  search(query: string) {
    this.loadingTask = true;
    this.loadingProject = true;
    this.searchQuery.next(query);
    this.searchService
      .searchProject(query)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(
        (res) => {
          this.projectList = res;
          this.loadingProject = false;

        },
        (err) => {
          this.onError(err);
        }
      );

    this.searchService
      .searchTask(query)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => {
        this.taskList = res;
        this.loadingTask = false;
      });
  }


  onError(err): void {
    console.log(err);
  }

}
