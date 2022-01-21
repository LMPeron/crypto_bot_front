import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogRef } from '@nebular/theme';
import { NbAuthExtendedService } from 'src/app/@auth/nb-auth-extended.service';
import { IProject } from 'src/app/@core/data/project';
import { IProjectTask } from 'src/app/@core/data/projectTask';
import { ITimesheet } from 'src/app/@core/data/timesheet';
import { IUserMini } from 'src/app/@core/data/users';
import { ProjectTaskService } from 'src/app/@core/services/projectTask.service';
import { ProjectUtilService } from 'src/app/@core/services/projectUtil.service';

@Component({
  selector: 'ngx-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  @Input() project: Partial<IProject>;
  @Input() task: Partial<IProjectTask>;
  @Input() title: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() context: {};
  usersInvolved: IUserMini[];
  taskForm: FormGroup;
  taskTimesheet: any;
  submitted: boolean;
  error = false;
  listError: {
    listFieldError: [];
    msg: string;
    statusCode: number;
  };
  dataSourceTimesheet = new MatTableDataSource<ITimesheet>();
  displayedColumns: string[] = ['userName', 'startHour', 'endHour'];

  constructor(
    protected dialogRef: NbDialogRef<EditTaskDialogComponent>,
    private formBuilder: FormBuilder,
    private projectUtilService: ProjectUtilService,
    private authService: NbAuthExtendedService,
    private projectTaskService: ProjectTaskService
  ) {}

  ngOnInit(): void {
    if (this.task != null) {
      this.taskForm = this.formBuilder.group({
        title: this.task.title,
        description: this.task.description,
        project: this.project,
        owner: this.task.owner.id,
      });
      this.getTaskTimesheet(this.task.id);
    }

    this.getUsersInvolved();
  }
  get f() {
    return this.taskForm.controls;
  }

  close() {
    this.dialogRef.close();
  }

  getUsersInvolved() {
    if (this.project.usersInvolved != null) {
      this.usersInvolved = this.project.usersInvolved;
    } else {
      this.projectUtilService.getUsersByCompany(this.authService.currentUserValue.company).subscribe(
        (res) => {
          this.usersInvolved = res;
          this.taskForm.patchValue({ owner: this.task.owner });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getTaskTimesheet(id) {
    this.projectTaskService.getTaskTimesheet(id).subscribe(
      (res) => {
        this.taskTimesheet = res;
        this.taskTimesheet.sort((a, b) => a.startHour - b.startHour);
        this.dataSourceTimesheet = new MatTableDataSource(this.taskTimesheet);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
