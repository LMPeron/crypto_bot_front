import { Component, Input } from "@angular/core";
import { NbDialogRef } from '@nebular/theme';
import { IExpense } from 'src/app/@core/data/expense';
import { IProject } from "src/app/@core/data/project";

@Component({
      selector: 'ngx-inactivate-expense-dialog',
      templateUrl: './inactivate-expense-dialog.component.html',
      styleUrls: ['./inactivate-expense-dialog.component.scss'],
})
export class InactivateExpenseDialog {

      constructor(protected dialogRef: NbDialogRef<InactivateExpenseDialog>) {
            dialogRef.onBackdropClick.subscribe(() => {
                        this.dialogRef.close();
                  }
            );

      }
      @Input() project: Partial<IProject>;
      @Input() expense: Partial<IExpense>;
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