import { IProject } from 'src/app/@core/data/project';
import { IProjectTask } from './../../../@core/data/projectTask';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbAuthExtendedService } from 'src/app/@auth/nb-auth-extended.service';
import { NewWorkingHoursComponent } from '../../dialog/new-working-hours/new-working-hours.component';

@Component({
  selector: 'ngx-visao-geral-task',
  templateUrl: './visao-geral-task.component.html',
  styleUrls: ['./visao-geral-task.component.scss'],
})
export class VisaoGeralTaskComponent implements OnInit, OnChanges {
  @Input() projectTask: Partial<IProjectTask>;
  @Input() project: Partial<IProject>;

  loading = true;
  editable = false;

  taskViewRules: [];

  canAddNewWorkingtime = false;
  public newTimesheetEvent: Event;
  constructor(private authService: NbAuthExtendedService, private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.projectTask) {
      if (!changes.projectTask.firstChange) {
        if (
          this.projectTask.owner.id === this.authService.currentUserValue.id &&
          (this.projectTask.status.id === 'ts1' || this.projectTask.status.id === 'ts2' || this.projectTask.status.id === 'ts3')
        ) {
          this.canAddNewWorkingtime = true;
        }
      }
    }
  }

  reciverEvent(event: Event) {}

  newWorkingHourDialog() {
    const dialogref = this.dialogService.open(NewWorkingHoursComponent, {
      context: {
        title: 'ADICIONAR HORAS TRABALHADAS',
        projectTask: this.projectTask,
      },
    });

    dialogref.onClose.subscribe(
      (res) => {
        if (res !== null && res !== undefined) {
          this.newTimesheetEvent = res;
          // // Retorna os jsutificationsIds selectionados
          // this.assumeTask(task.id, res[0], res[1]);
        }
      },
      (err) => {
        // this.error = true;
        // this.errorMsg = err;
        // this.submited = false;
      }
    );
  }
}
