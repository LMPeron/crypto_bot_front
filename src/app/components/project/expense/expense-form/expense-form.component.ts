import { CurrencyPipe } from '@angular/common';
import { IExpenseType } from './../../../../@core/data/expenseType';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ExpenseService } from 'src/app/@core/services/expense.service';
import { ExpenseDTO, IExpense, RawFormValue } from 'src/app/@core/data/expense';
import { IProject } from 'src/app/@core/data/project';


@Component({
      selector: 'ngx-expense-form',
      templateUrl: './expense-form.component.html',
      styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent implements OnInit, OnChanges
{
      @Input() title: string;
      @Input() expense?: IExpense;
      @Input() project: Partial<IProject>;
      @Output() newExpenseEvent = new EventEmitter();

      loading = false;
      submitted = false;
      expenseForm: FormGroup;

      expenseType: IExpenseType;

      expenseTypeList: IExpenseType[];

      constructor(
            protected dialogRef: NbDialogRef<ExpenseFormComponent>,
            private formBuilder: FormBuilder,
            private expenseService: ExpenseService,
            private toastrService: NbToastrService,
            private currencyPipe: CurrencyPipe
      ) { }

      ngOnInit(): void
      {
            this.initForm();
            this.getData();
      }

      ngOnChanges(): void
      {
            // this.expenseForm = this.formBuilder.group({
            //       description: [this.expense.description, [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]],
            //       date: [{ value: this.expense.date }, [Validators.required]],
            //       value: [{ value: this.expense.value }, [Validators.required]],
            //       quantity: [{ value: this.expense.quantity }],
            //       otherType: [{ value: this.expense.otherType }],
            //       type: [{ value: this.expense.type }, [Validators.required]],
            //       project: [{ value: this.project.id }]
            // });
      }

      initForm()
      {
            this.expenseForm = this.formBuilder.group({
                  description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]],
                  date: [null, [Validators.required]],
                  value: [null, [Validators.required]],
                  quantity: [null],
                  otherType: [null],
                  expenseType: [null],
                  project: [this.project]
            });
      }

      getData()
      {
            this.loading = true
            this.expenseService.getAllExpenseType().subscribe(
                  (data) =>
                  {
                        this.expenseTypeList = data;
                        this.loading = false;
                  },
                  (err) =>
                  {
                        this.onError(err.msg);
                  }
            );

      }

      get f()
      {
            return this.expenseForm.controls;
      }

      addExpense()
      {
            this.submitted = true;

            // if (this.f.value.value) this.convertCurrencytoNumberForm('value');


            if (!this.expenseForm.valid)
            {
                  this.submitted = false;
                  return;
            }

            const expense = new ExpenseDTO(this.expenseForm.value as RawFormValue);

            this.expenseService.addExpense(expense).subscribe(
                  (res) =>
                  {
                        this.submitted = false;
                        this.expenseForm.reset();
                        this.newExpenseEvent.emit('newExpense');
                        this.close();
                  },
                  (err) =>
                  {
                        this.onError(err.msg);
                  }
            );
      }

      //transformNumberCurrency(element) {
      //    let value = this.expenseForm.controls[element].value;
      ////  value = this.currencyPipe.transform(value, 'R$');
      //this.expenseForm.controls[element].patchValue(value);
      //}



      onError(message: any): void
      {
            if (message !== '' && message)
            {
                  this.toastrService.show('', message, {
                        status: 'danger',
                        preventDuplicates: true,
                        hasIcon: false,
                        duration: 6000,
                  });
            } else
            {
                  this.showToaster();
            }
      }


      formatCurrency(value: string): void
      {
            if (this.expenseForm.get(value))
            {
                  let text: string = this.expenseForm.get(value).value.replace(/[$\s]/, '').replace(/[R\s]/, '').replace(/,/g, '.');

                  for (let i = 0; i <= text.length; i++)
                  {
                        if (text[i] == text[i - 1] && text[i] == '.')
                        {
                              text = text.slice(0, i - 1) + text.slice(i);
                              i--;
                        }
                  }

                  let formatted: string = this.currencyPipe.transform(text, 'BRL', 'symbol');

                  this.expenseForm.patchValue({
                        [value]: formatted
                  }, { emitEvent: false });
            }
      }


      showToaster()
      {
            this.toastrService.show('Aguarde um momento e tente novamente.', 'Erro de conexão com a API', {
                  status: 'danger',
                  preventDuplicates: true,
                  hasIcon: false,
                  duration: 6000,
            });
      }

      close()
      {
            this.dialogRef.close('');
      }

}