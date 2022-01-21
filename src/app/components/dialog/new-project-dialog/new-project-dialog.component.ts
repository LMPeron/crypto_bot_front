import { IProject } from '../../../@core/data/project';
import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss'],
})
export class NewProjectDialogComponent {
  constructor(protected dialogRef: NbDialogRef<NewProjectDialogComponent>) {
    dialogRef.onBackdropClick.subscribe(() => {
        window.location.href = '/projetos/' + this.project.id;
      }
    );

    dialogRef.onClose.subscribe(() => {
        window.location.href = '/projetos/' + this.project.id;
      }
    );
  }
  @Input() name: string;
  @Input() project: IProject;

  

  cancel() {
    this.dialogRef.close();
  }

  submit(name) {
    this.dialogRef.close(name);
  }
  dismiss() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
