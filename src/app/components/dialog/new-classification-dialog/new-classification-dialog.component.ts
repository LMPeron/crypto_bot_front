import { IClassification } from '../../../@core/data/classification';
import { Component, Input } from "@angular/core";
import { NbDialogRef } from '@nebular/theme';

@Component({
      selector: 'ngx-classification-new',
      templateUrl: './new-classification-dialog.component.html',
      styleUrls: ['./new-classification-dialog.component.scss'],
})
export class NewClassificationDialogComponent {

      constructor(protected dialogRef: NbDialogRef<NewClassificationDialogComponent>) {
            dialogRef.onBackdropClick.subscribe(() => {
                        window.location.href = 'projetos/classificacao/' + this.classification.id;
                  }
            );

            dialogRef.onClose.subscribe(() => {
                        window.location.href = 'projetos/classificacao/' + this.classification.id;
                  }
            );
      }
      @Input() classification: Partial<IClassification>;
      @Input() description: string;

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