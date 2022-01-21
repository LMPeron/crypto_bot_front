import { IProjectTask } from '../../../@core/data/projectTask';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ProjectTaskService } from 'src/app/@core/services/projectTask.service';

@Component({
  selector: 'ngx-project-task-list',
  templateUrl: './project-task-list.component.html',
  styleUrls: ['./project-task-list.component.scss']
})
export class ProjectTaskListComponent implements OnInit {
  loadingAllProjectTasks = false;
  projectTaskAllSize = 0;
  dataSourceAll = new MatTableDataSource<IProjectTask>();


  constructor(
    private projectTaskService: ProjectTaskService
  ) {}

  ngOnInit(): void {
    this.getAllProjectTasks();
  }

  getAllProjectTasks() {
    this.loadingAllProjectTasks = true;
    this.projectTaskService.getAll().subscribe(
      (res) => {
        this.loadingAllProjectTasks = false;
        this.dataSourceAll = new MatTableDataSource<IProjectTask>(res);

        if (res !== null) {
          this.projectTaskAllSize = res.length;
        }
      },
      (err) => {
        this.loadingAllProjectTasks = false;
        console.log(err);
      }
    );
  }

}
